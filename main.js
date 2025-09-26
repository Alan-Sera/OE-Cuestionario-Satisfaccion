let ratings = {};
let recommendation = '';

// Manejo de calificaciones por estrellas
document.querySelectorAll('.stars').forEach(starsContainer => {
  const category = starsContainer.dataset.rating;
  const stars = starsContainer.querySelectorAll('.star');

  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      const value = parseInt(star.dataset.value);
      ratings[category] = value;

      // Actualizar visualización
      stars.forEach((s, i) => {
        if (i < value) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });
    });

    star.addEventListener('mouseover', () => {
      const value = parseInt(star.dataset.value);
      stars.forEach((s, i) => {
        if (i < value) {
          s.style.color = '#fbbf24';
          s.style.transform = 'scale(1.2)';
        } else {
          s.style.color = '#d1d5db';
          s.style.transform = 'scale(1)';
        }
      });
    });
  });

  starsContainer.addEventListener('mouseleave', () => {
    const currentRating = ratings[category] || 0;
    stars.forEach((s, i) => {
      if (i < currentRating) {
        s.style.color = '#f59e0b';
        s.style.transform = 'scale(1.1)';
      } else {
        s.style.color = '#d1d5db';
        s.style.transform = 'scale(1)';
      }
    });
  });
});

// Manejo de recomendación
document.querySelectorAll('.recommendation-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.recommendation-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    recommendation = btn.dataset.value;
  });
});

// Envío del formulario
document.getElementById('satisfactionForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Recopilar datos
  const formData = {
    clinic: 'Odontología Especializada Chetumal',
    patientName: document.getElementById('patientName').value,
    treatmentDate: document.getElementById('treatmentDate').value,
    treatmentType: document.getElementById('treatmentType').value,
    ratings: ratings,
    recommendation: recommendation,
    comments: document.getElementById('comments').value,
    timestamp: new Date().toISOString(),
    location: 'Chetumal, Quintana Roo'
  };

  // Aquí conectamos con la backend)
  // console.log('Datos del formulario:', formData);

  // Ocultar sección de cuestionario
  document.getElementById('form-section').classList.add('hidden');
  // Mostrar sección de agradecimiento
  document.getElementById('thank-you-section').classList.remove('hidden');

  // Mostrar sección de Google solo si la experiencia fue positiva
  const avgRating = Object.values(ratings).reduce((a, b) => a + b, 0) / Object.values(ratings).length;
  if (avgRating >= 3 && recommendation === 'si') {
    document.getElementById('google-section').style.display = 'block';
    generateReview(formData, avgRating);
  } else {
    document.getElementById('google-section').style.display = 'none';
  }
});

/*
<option value="resina-estetica">Resinas estéticas</option>
<option value="incrustacion-recina">Incrustación de recina estetica</option>
<option value="protesis-fija">Protesis fija</option>
<option value="protesis-removible">Prótesis removible</option>
*/

// Función para generar reseña personalizada
function generateReview(formData, avgRating) {
  const treatmentNames = {
    'consulta-inicial': 'consulta inicial y diagnóstico',
    'limpieza-dental': 'limpieza dental profesional',
    'brackets-metalicos': 'colocación de brackets metálicos',
    'brackets-esteticos': 'brackets estéticos',
    'invisalign': 'tratamiento con alineadores transparentes',
    'retenedores': 'colocación de retenedores',
    'resina-estetica': 'resinas estéticas',
    'incrustacion-recina': 'incrustacion de recina estética',
    'protesis-fija': 'prótesis fija',
    'protesis-removible': 'prótesis removible',
    'cirugia-oral': 'cirugía oral',
    'extraccion': 'extracción dental',
    'ajuste-ortodoncico': 'ajuste ortodóncico',
    'blanqueamiento': 'blanqueamiento dental',
    'implante': 'implante dental',
    'endodoncia': 'endodoncia',
    'otro': 'tratamiento dental'
  };

  const treatmentName = treatmentNames[formData.treatmentType] || 'tratamiento dental';
  const stars = '⭐'.repeat(Math.round(avgRating));

  // Aspectos específicos basados en calificaciones
  let aspectos = [];
  if (formData.ratings.customerService >= 5) aspectos.push('excelente atención al cliente');
  if (formData.ratings.professionalism >= 5) aspectos.push('gran profesionalismo');
  if (formData.ratings.facilities >= 5) aspectos.push('buenas instalaciones');
  if (formData.ratings.results >= 5) aspectos.push('resultados excepcionales');

  // Generar reseña
  let review = `${stars} Excelente experiencia en Odontología Especializada Chetumal. `;

  if (treatmentName) {
    review += `Recibí ${treatmentName} y quedé muy satisfecho/a. `;
  }

  if (aspectos.length > 0) {
    review += `Destaco su ${aspectos.join(', ')}. `;
  }

  // Agregar comentario personal si existe
  if (formData.comments && formData.comments.trim()) {
    const cleanComment = formData.comments.trim();
    // Limitamos a 200 caracteres para la reseña de Google
    const shortComment = cleanComment.length > 200 ?
      cleanComment.substring(0, 200) + '...' : cleanComment;
    review += `${shortComment} `;
  }

  // Mensaje final
  if (formData.recommendation === 'si') {
    const mensajesFinales = [
      'Definitivamente recomiendo este consultorio a cualquier persona que busque atención dental de calidad en Chetumal. Los profesionales son muy competentes y el trato es excepcional.',

      'Sin duda lo recomendaría a familiares y amigos. Es el mejor consultorio dental que he visitado en Chetumal, con un equipo muy profesional y resultados excelentes.',

      'Totalmente recomendado para quien busque ortodoncia de primera calidad en Chetumal. El personal es muy atento y las instalaciones son de primera.',

      'Excelente opción en Chetumal para tratamientos de ortodoncia y cirugía oral. Lo recomiendo ampliamente por su profesionalismo y tecnología moderna.',

      'Recomiendo 100% este consultorio. En Chetumal es difícil encontrar esta calidad de atención dental, pero aquí la encontré.',

      'Si buscan un ortodoncista confiable en Chetumal, este es el lugar indicado. El trato es excepcional y los resultados hablan por sí solos.',

      'Lo recomiendo sin dudarlo. Es el consultorio dental más profesional de Chetumal, con tecnología de vanguardia y personal altamente capacitado.',

      'Excelente servicio desde la primera consulta hasta el final del tratamiento. Lo recomendaría a cualquier persona en Chetumal que necesite atención dental especializada.',

      'Definitivamente mi primera opción para tratamientos dentales en Chetumal. El equipo médico es excepcional y las instalaciones son impecables.',

      'Recomiendo este consultorio por su atención personalizada y profesional. En Chetumal no encontrarás mejor servicio de ortodoncia.',

      'Sin duda la mejor experiencia dental que he tenido en Chetumal. Lo recomiendo ampliamente por su calidad humana y profesional.',

      'Excelente consultorio en Chetumal. Lo recomiendo por sus resultados excepcionales y el trato tan cálido del personal.',

      'Para cualquier persona que busque ortodoncia de calidad en Chetumal, este consultorio es la mejor opción. Completamente recomendado.',

      'Lo recomiendo por ser el consultorio más innovador y profesional de Chetumal. Una experiencia dental de primer nivel.',

      'Definitivamente regresaría y lo recomiendo a todos en Chetumal. Es un consultorio que realmente se preocupa por sus pacientes.'
    ];

    // Seleccionar mensaje aleatorio
    const mensajeAleatorio = mensajesFinales[Math.floor(Math.random() * mensajesFinales.length)];
    review += mensajeAleatorio;
  }

  // Mostrar la reseña generada
  document.getElementById('generatedReview').textContent = review;
}

// Función para copiar reseña
function copyReview() {
  const reviewText = document.getElementById('generatedReview').textContent;
  navigator.clipboard.writeText(reviewText).then(function () {
    const successMessage = document.getElementById('copySuccess');
    successMessage.classList.add('show');
    setTimeout(() => {
      successMessage.classList.remove('show');
    }, 3000);
  });
}

// Función para redirigir a Google Maps con reseña
function redirectToGoogle() {
  // Copiamos la reseña automáticamente
  copyReview();
  // Redirigimos después de un pequeño delay
  setTimeout(() => {
    const googleMapsURL = 'https://g.page/r/Ca2Ol-tk-OV_EAE/review';
    window.open(googleMapsURL, '_blank');
  }, 500);
}

// Función para ir a Google Maps sin reseña preestablecida
function redirectToGoogleManual() {
  const googleMapsURL = 'https://g.page/r/Ca2Ol-tk-OV_EAE/review';
  window.open(googleMapsURL, '_blank');
}

// Animación de entrada
window.addEventListener('load', () => {
  document.querySelector('.form-container').style.opacity = '1';
});

// Formatear fecha en español
function formatDateToSpanish(date) {
  const day = date.getDate();
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
    'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const month = months[date.getMonth()];
  return `${day} ${month}`;
}

// Actualizar el texto del botón con la fecha actual
function updateTodayButton() {
  const today = new Date();
  const formattedDate = formatDateToSpanish(today);
  const todayBtn = document.querySelector('.today-btn');
  todayBtn.innerHTML = `📅 Hoy (${formattedDate})`;
}

// Función para establecer la fecha actual
function setTodayDate() {
  const today = new Date();
  // Usar la misma fecha que se muestra en el botón
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  document.getElementById('treatmentDate').value = formattedDate;

  // Agregamos un pequeño efecto visual
  const input = document.getElementById('treatmentDate');
  input.style.background = 'linear-gradient(145deg, #dcfce7, #ffffff)';
  input.style.borderColor = '#10b981';

  setTimeout(() => {
    input.style.background = '';
    input.style.borderColor = '';
  }, 1500);
}

window.addEventListener('load', () => {
  updateTodayButton();
});