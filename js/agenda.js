/**
 * Grupo Saneri S. de R.L. — agenda.js
 * Formulario para agendar eventos. Valida los campos y arma un mensaje de
 * WhatsApp con el resumen de la solicitud para que el equipo de Grupo Saneri
 * confirme disponibilidad y cotización.
 */
'use strict';

window.GS = window.GS || {};

(function initAgendaForm() {
  const form = document.getElementById('agendaForm');
  if (!form) return;

  const dateInput = form.querySelector('[name="fecha"]');
  if (dateInput) {
    const min = new Date();
    min.setDate(min.getDate() + 3); // mínimo 3 días de anticipación
    dateInput.min = min.toISOString().split('T')[0];
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const tipoEvento = form.querySelector('[name="tipoEvento"]:checked')?.value;
    const fecha = form.querySelector('[name="fecha"]')?.value;
    const horario = form.querySelector('[name="horario"]')?.value;
    const invitados = form.querySelector('[name="invitados"]')?.value;
    const ubicacion = form.querySelector('[name="ubicacion"]')?.value.trim();
    const nombre = form.querySelector('[name="nombre"]')?.value.trim();
    const telefono = form.querySelector('[name="telefono"]')?.value.trim();
    const correo = form.querySelector('[name="correo"]')?.value.trim();
    const serviciosChecks = Array.from(form.querySelectorAll('[name="servicios"]:checked')).map(function (c) { return c.value; });
    const comentarios = form.querySelector('[name="comentarios"]')?.value.trim();

    if (!tipoEvento || !fecha || !nombre || !telefono) {
      GS.showToast('Completa tipo de evento, fecha, nombre y teléfono para continuar.');
      return;
    }

    const lines = [
      'Hola Grupo Saneri! 🎉 Quiero agendar un evento:',
      '',
      '*Tipo de evento:* ' + tipoEvento,
      '*Fecha tentativa:* ' + fecha,
      horario ? '*Horario preferido:* ' + horario : null,
      invitados ? '*Número de invitados:* ' + invitados : null,
      ubicacion ? '*Ubicación:* ' + ubicacion : null,
      serviciosChecks.length ? '*Servicios de interés:* ' + serviciosChecks.join(', ') : null,
      comentarios ? '*Comentarios:* ' + comentarios : null,
      '',
      '*Nombre:* ' + nombre,
      '*Teléfono:* ' + telefono,
      correo ? '*Correo:* ' + correo : null,
      '',
      'Quedo atento(a) para coordinar la cotización. ¡Gracias!'
    ].filter(Boolean);

    const successBox = document.getElementById('agendaSuccess');
    window.open(GS.waLink(lines.join('\n')), '_blank');

    if (successBox) {
      form.style.display = 'none';
      successBox.classList.add('is-visible');
    } else {
      form.reset();
      GS.showToast('¡Solicitud enviada! Te contactaremos pronto.');
    }
  });
})();
