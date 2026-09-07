// Contenido público editable. Nunca agregar secretos ni configuración del CRM aquí.
const mail = (subject: string) => `mailto:cuentamelo@pawwerapp.com?subject=${encodeURIComponent(subject)}`;
export const contact = { trial: mail('Quiero solicitar la prueba de 7 días de PAWWER'), agency: mail('Quiero una propuesta de PAWWER Agencia'), plan: (name: string) => mail(`Me interesa el plan ${name} de PAWWER`) };
export const plans = [
  { name: 'Esencial', price: '$1,490', summary: 'Pon orden en tu operación comercial.', inherits: 'Lo esencial para comenzar', features: ['CRM de leads, contactos y seguimiento', 'Calendario de citas', 'Marca, biblioteca y preparación de contenidos', '3 integrantes', 'Hasta 2 canales con conexión oficial', '60 créditos operativos'], note: '' },
  { name: 'Crecimiento', price: '$2,990', summary: 'Conecta tus contenidos con tus oportunidades.', inherits: 'Todo Esencial, más', features: ['10 integrantes', 'Planner de contenidos', 'Mapa y origen de leads', 'Resultados, cotizaciones y contratos', 'Hasta 4 canales con conexión oficial', '180 créditos operativos'], note: '' },
  { name: 'Escala', price: '$5,490', summary: 'Amplía el alcance de tu equipo.', inherits: 'Todo Crecimiento, más', features: ['25 integrantes', 'Automatización comercial', 'Atención prioritaria', 'Analítica operativa', 'Hasta 8 canales con conexión oficial', '400 créditos operativos'], note: 'Agente IA con traspaso humano y automatizaciones multicanal, sujetos a concluir pruebas de integración.' },
];
