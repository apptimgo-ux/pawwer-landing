/* global CMS, createClass, h */
(function () {
  'use strict';
  var origin = window.location.origin;
  var mediaKeys = new Set(['image', 'video', 'poster', 'ogImage']);

  function resolveMedia(value, getAsset, key) {
    if (typeof value === 'string' && value && mediaKeys.has(key)) {
      try { return getAsset(value).toString(); } catch (_) { return value; }
    }
    if (Array.isArray(value)) return value.map(function (item) { return resolveMedia(item, getAsset, ''); });
    if (value && typeof value === 'object') {
      var result = {};
      Object.keys(value).forEach(function (field) { result[field] = resolveMedia(value[field], getAsset, field); });
      return result;
    }
    return value;
  }

  function template(kind, locale) {
    return createClass({
      getInitialState: function () { return { width: 1280, available: 640, ready: false }; },
      componentDidMount: function () {
        var self = this;
        this.receive = function (event) {
          if (event.origin !== origin || !self.frame || event.source !== self.frame.contentWindow) return;
          if (event.data && event.data.type === 'pawwer:preview-ready') {
            self.setState({ ready: true });
            self.sendDraft();
          }
        };
        window.addEventListener('message', this.receive);
        // React preview components are mounted in Decap's iframe document.
        // Message events therefore belong to that document's window too.
        this.hostWindow = this.frame.ownerDocument.defaultView;
        if (this.hostWindow !== window) this.hostWindow.addEventListener('message', this.receive);
        this.observer = new ResizeObserver(function (entries) {
          self.setState({ available: Math.max(240, entries[0].contentRect.width) });
        });
        this.observer.observe(this.container);
      },
      componentDidUpdate: function () {
        // Decap may mutate the Immutable entry in place while a field is edited.
        // Always send the current draft so the real site preview stays in sync.
        this.sendDraft();
      },
      componentWillUnmount: function () {
        window.removeEventListener('message', this.receive);
        if (this.hostWindow && this.hostWindow !== window) this.hostWindow.removeEventListener('message', this.receive);
        this.observer.disconnect();
      },
      sendDraft: function () {
        if (!this.frame || !this.frame.contentWindow) return;
        var data = this.props.entry.getIn(['data']).toJS();
        this.frame.contentWindow.postMessage({
          type: 'pawwer:draft', kind: kind, locale: locale,
          data: resolveMedia(data, this.props.getAsset, ''),
        }, origin);
      },
      render: function () {
        var self = this;
        var scale = Math.min(1, this.state.available / this.state.width);
        var button = function (width, label) {
          return h('button', { key: width, type: 'button', 'aria-pressed': self.state.width === width,
            onClick: function () { self.setState({ width: width }); },
            style: { padding: '8px 12px', border: '1px solid #ccd3df', borderRadius: 5, cursor: 'pointer',
              background: self.state.width === width ? '#182448' : '#fff', color: self.state.width === width ? '#fff' : '#182448' },
          }, label);
        };
        return h('div', { style: { fontFamily: 'system-ui', background: '#eef1f6' } },
          h('div', { style: { padding: 12, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' } },
            h('strong', { style: { width: '100%', fontSize: 14 } }, 'Vista previa · cambios sin publicar'),
            button(1280, 'Computadora'), button(768, 'Tableta'), button(390, 'Celular'),
            h('span', { style: { fontSize: 12, color: '#536078' } }, this.state.width + ' px · ' + Math.round(scale * 100) + '%'),
          ),
          h('div', { ref: function (el) { self.container = el; }, style: { overflow: 'hidden', height: '78vh', minHeight: 420 } },
            h('iframe', {
              title: 'Vista previa real de PAWWER', src: origin + '/editor-preview',
              ref: function (el) { self.frame = el; },
              onLoad: function () { self.sendDraft(); },
              style: { display: 'block', border: 0, background: '#fff', width: this.state.width,
                height: 'calc(78vh / ' + scale + ')', minHeight: 420 / scale,
                transform: 'scale(' + scale + ')', transformOrigin: 'top left',
                marginLeft: Math.max(0, (this.state.available - this.state.width) / 2) },
            }),
          ),
          h('p', { style: { margin: 0, padding: 12, fontSize: 12, color: '#536078' } },
            'Sube archivos en los campos del bloque. Guarda como borrador; publica solo cuando estés conforme. Los enlaces comerciales están desactivados en esta vista.'),
        );
      },
    });
  }
  CMS.registerPreviewStyle('body{margin:0!important} .frame-content{padding:0!important;max-width:none!important}', { raw: true });
  CMS.registerPreviewTemplate('es', template('content', 'es'));
  CMS.registerPreviewTemplate('contenido_es', template('content', 'es'));
  CMS.registerPreviewTemplate('en', template('content', 'en'));
  CMS.registerPreviewTemplate('contenido_en', template('content', 'en'));
  CMS.registerPreviewTemplate('settings', template('settings', 'es'));
  CMS.registerPreviewTemplate('ajustes', template('settings', 'es'));
}());
