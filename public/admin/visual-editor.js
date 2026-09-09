/* global CMS, createClass, h */
(function () {
  'use strict';
  var NativeList = CMS.getWidget('list').control;
  var labels = {hero:'Portada',statement:'Presentación',process:'Soluciones',pillars:'Funciones',showcase:'El CRM en acción',benefits:'Beneficios',gallery:'Fotos y casos de uso',logos:'Logos',pricing:'Planes',agency:'Agencia',notes:'Condiciones',cta:'Contacto'};
  function media(value, getAsset, key) {
    if (typeof value === 'string' && ['image','video','poster','ogImage'].includes(key) && value) {
      try { return getAsset(value).toString(); } catch (_) { return value; }
    }
    if (Array.isArray(value)) return value.map(function(v){return media(v,getAsset,'');});
    if (value && typeof value === 'object') { var result={}; Object.keys(value).forEach(function(k){result[k]=media(value[k],getAsset,k);}); return result; }
    return value;
  }
  CMS.registerWidget('pawwer-visual', createClass({
    getInitialState:function(){return {open:true,width:1280,available:900,selected:0};},
    componentDidMount:function(){
      var self=this;
      this.receive=function(e){
        if(e.origin!==location.origin || !self.frame || e.source!==self.frame.contentWindow) return;
        var m=e.data || {};
        if(m.type==='pawwer:preview-ready') self.send();
        if(m.type==='pawwer:select' && Number.isInteger(m.index) && m.index>=0 && m.index<self.props.value.size) self.select(m.index);
        if(m.type==='pawwer:edit' && Number.isInteger(m.index) && m.index>=0 && m.index<self.props.value.size && ['h1a','h1b','sub','h2','h2a','h2b','body','eyebrow','kicker','ctaPrimary','ctaSecondary','buttonLabel'].includes(m.field) && typeof m.value==='string') {
          self.props.onChange(self.props.value.setIn([m.index,m.field],m.value.slice(0,10000)));
        }
      };
      window.addEventListener('message',this.receive);
      this.resize=new ResizeObserver(function(entries){self.setState({available:Math.max(280,entries[0].contentRect.width)});});
      if(this.canvas) this.resize.observe(this.canvas);
      this.select(0);
    },
    componentDidUpdate:function(){this.send();},
    componentWillUnmount:function(){window.removeEventListener('message',this.receive);this.resize.disconnect();},
    send:function(){
      if(!this.frame)return;
      var data=this.props.entry.get('data').toJS(); data.blocks=this.props.value.toJS();
      this.frame.contentWindow.postMessage({type:'pawwer:draft',kind:'content',locale:data.htmlLang.startsWith('en')?'en':'es',data:media(data,this.props.getAsset,''),editable:true},location.origin);
    },
    select:function(index){
      this.setState({selected:index});
      if(this.list && this.list.setState) this.list.setState({listCollapsed:false,itemsCollapsed:this.props.value.map(function(_,i){return i!==index;}).toArray()});
      if(this.frame)this.frame.contentWindow.postMessage({type:'pawwer:focus',index:index},location.origin);
    },
    render:function(){
      var self=this,scale=Math.min(1,this.state.available/this.state.width);
      return h('div',{},
        h('button',{type:'button',className:'pw-open',onClick:function(){self.setState({open:!self.state.open});}},this.state.open?'Cerrar vista ampliada':'Abrir editor visual'),
        h('div',{className:this.state.open?'pw-studio':'pw-studio pw-closed'},
          h('div',{className:'pw-tools'},h('strong',{},'PAWWER · Editor visual'),h('span',{},'Haz clic en una sección. Doble clic en un texto para escribir.'),
            [1280,768,390].map(function(w,i){return h('button',{key:w,type:'button','aria-pressed':self.state.width===w,onClick:function(){self.setState({width:w});}},['Computadora','Tableta','Celular'][i]);}),
            h('button',{type:'button',onClick:function(){self.setState({open:false});}},'Volver a guardar / publicar')),
          h('aside',{className:'pw-fields'},
            h('p',{className:'pw-help'},'Tus cambios son un borrador. Al terminar, vuelve al panel para guardar y publicar.'),
            h('label',{},'Sección que quieres editar',h('select',{value:self.state.selected,onChange:function(e){self.select(Number(e.target.value));}},this.props.value.map(function(b,i){return h('option',{value:i,key:i},(i+1)+'. '+(labels[b.get('type')]||b.get('type')));}).toArray())),
            h('p',{className:'pw-help'},'Fotos y videos: abre el campo Imagen o Video del bloque y pulsa Elegir archivo. Puedes seleccionar los medios existentes o subir uno nuevo.'),
            h(NativeList,Object.assign({},this.props,{ref:function(el){self.list=el;},field:this.props.field.set('widget','list')}))),
          h('div',{className:'pw-canvas',ref:function(el){self.canvas=el;}},h('iframe',{title:'Tu página editable',src:'/editor-preview',ref:function(el){self.frame=el;},onLoad:function(){self.send();},style:{width:this.state.width,height:Math.max(700,window.innerHeight-160)/scale,transform:'scale('+scale+')',transformOrigin:'top left',border:0,background:'white'}}))
        )
      );
    }
  }));
}());

