const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'assets');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const pdfPath = path.join(outputDir, 'Sithavan_S_Resume.pdf');
const doc = new PDFDocument({ 
  size: 'A4',
  margin: 36
});

const stream = fs.createWriteStream(pdfPath);
doc.pipe(stream);

// Primary Palette
const PRIMARY = '#1A1A1A';
const SECONDARY = '#444444';
const LINE_COLOR = '#000000';

function drawSectionHeading(title) {
  doc.fontSize(10.5).font('Helvetica-Bold').fillColor(PRIMARY).text(title.toUpperCase());
  doc.moveTo(36, doc.y).lineTo(559, doc.y).strokeColor(LINE_COLOR).lineWidth(0.8).stroke();
  doc.moveDown(0.3);
}

// 1. Header
doc.fontSize(20).font('Helvetica-Bold').fillColor(PRIMARY).text('SITHAVAN S', { align: 'left' });
doc.fontSize(11).font('Helvetica').fillColor(SECONDARY).text('Java Developer • Software Development', { align: 'left' });
doc.fontSize(9).font('Helvetica').fillColor(SECONDARY).text('Chennai, Tamil Nadu | +91 8838547460 | sithavan2311@gmail.com | www.linkedin.com/in/sithavan16', { align: 'left' });
doc.moveDown(0.2);
doc.moveTo(36, doc.y).lineTo(559, doc.y).strokeColor(LINE_COLOR).lineWidth(1.2).stroke();
doc.moveDown(0.5);

// 2. Professional Summary
drawSectionHeading('PROFESSIONAL SUMMARY');
doc.fontSize(8.5).font('Helvetica').fillColor('#222222').text(
  'Java Software Developer with 8 months of hands-on experience building and maintaining full-stack healthcare applications. Proficient in Java, Spring Boot, RESTful APIs, JWT authentication, and frontend development with React/Next.js. Strong foundation in database design (PostgreSQL, MySQL), Git version control, and object-oriented programming. Demonstrated ability to design secure backend services, integrate third-party APIs, and collaborate effectively in agile remote teams. Seeking a Java Developer role to contribute to scalable, production-grade systems.',
  { align: 'justify', lineGap: 1.5 }
);
doc.moveDown(0.5);

// 3. Core Competencies
drawSectionHeading('CORE COMPETENCIES');

function drawCompetency(label, val) {
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#000000').text(label);
  doc.fontSize(8.5).font('Helvetica').fillColor('#333333').text(val);
}

drawCompetency('Programming Languages', 'Java, Python, JavaScript, SQL, HTML, CSS');
drawCompetency('Backend & Frameworks', 'Spring Boot, RESTful API Design, JWT Authentication, FHIR Integration, Microservices Fundamentals');
drawCompetency('Frontend', 'React, Next.js (TypeScript)');
drawCompetency('Databases & Tools', 'PostgreSQL, MySQL, Git, API Testing, Object-Oriented Programming');
doc.moveDown(0.5);

// 4. Professional Experience
drawSectionHeading('PROFESSIONAL EXPERIENCE');

// Job 1
doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#000000').text('Java Developer ', { continued: true })
   .font('Helvetica').fillColor('#444444').text('| Qiaben Health Care Solutions');
doc.fontSize(8).font('Helvetica-Oblique').fillColor('#666666').text('Nov 2025 – Jun 2026 | Remote');
doc.moveDown(0.2);

const qiabenBullets = [
  'Developed backend services in Java (Spring Boot) and frontend components in Next.js/TypeScript/React for a full-stack Electronic Health Record (EHR) system.',
  'Implemented core clinical workflows including encounters, assessments, medical history, physical exams, and provider sign-off, plus billing modules (invoices, claims, payments).',
  'Designed secure authentication using JWT and integrated FHIR-based external storage adapters for third-party healthcare system interoperability.',
  'Improved system reliability by implementing safe API response parsing, e-signature workflows, PDF export, and AI voice assistant support for documentation.',
  'Built reusable client-side components to speed up feature development and maintain UI consistency.'
];

qiabenBullets.forEach(b => {
  doc.fontSize(8.5).font('Helvetica').fillColor('#222222').text(`▪  ${b}`, { indent: 8, lineGap: 1.2 });
});
doc.moveDown(0.4);

// Job 2
doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#000000').text('IoT Technologies Intern ', { continued: true })
   .font('Helvetica').fillColor('#444444').text('| Barola Technologies');
doc.fontSize(8).font('Helvetica-Oblique').fillColor('#666666').text('Jun 2023 | Remote');
doc.moveDown(0.2);

doc.fontSize(8.5).font('Helvetica').fillColor('#222222').text('▪  Completed hands-on training in IoT fundamentals, sensors, microcontrollers, and embedded systems.', { indent: 8 });
doc.fontSize(8.5).font('Helvetica').fillColor('#222222').text('▪  Built and tested basic IoT modules to collect and monitor real-time sensor data.', { indent: 8 });
doc.moveDown(0.5);

// 5. Projects
drawSectionHeading('PROJECTS');

doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#000000').text('Campus Recruitment System ', { continued: true })
   .font('Helvetica').fillColor('#444444').text('| Java Web Application');
doc.fontSize(8.5).font('Helvetica').fillColor('#222222').text('▪  Developed a web-based campus recruitment platform to manage student registrations and job postings.', { indent: 8 });
doc.moveDown(0.3);

doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#000000').text('Genetic Disorder Prediction Model ', { continued: true })
   .font('Helvetica').fillColor('#444444').text('| Java | Web & Desktop Application');
doc.fontSize(8.5).font('Helvetica').fillColor('#222222').text('▪  Developed web-based and desktop applications in Java for predicting genetic disorders from patient clinical data using machine learning algorithms.', { indent: 8 });
doc.moveDown(0.5);

// 6. Education
drawSectionHeading('EDUCATION');

doc.fontSize(9).font('Helvetica-Bold').fillColor('#000000').text('B.Tech, Information Technology ', { continued: true })
   .font('Helvetica').fillColor('#444444').text('| Adhiyamman College of Engineering');
doc.fontSize(8).font('Helvetica-Oblique').fillColor('#666666').text('2021 – 2025');
doc.moveDown(0.2);

doc.fontSize(9).font('Helvetica-Bold').fillColor('#000000').text('12th Standard (State Board) ', { continued: true })
   .font('Helvetica').fillColor('#444444').text('| St. Vincent Pallotti Matric Higher Secondary School');
doc.fontSize(8).font('Helvetica-Oblique').fillColor('#666666').text('2020 – 2021');
doc.moveDown(0.2);

doc.fontSize(9).font('Helvetica-Bold').fillColor('#000000').text('10th Standard (State Board) ', { continued: true })
   .font('Helvetica').fillColor('#444444').text('| DJM Matric Higher Secondary School');
doc.fontSize(8).font('Helvetica-Oblique').fillColor('#666666').text('2018 – 2019');
doc.moveDown(0.5);

// 7. Training & Courses
drawSectionHeading('TRAINING & COURSES');
doc.fontSize(9).font('Helvetica-Bold').fillColor('#000000').text('Full-Stack Development');
doc.fontSize(8.5).font('Helvetica').fillColor('#333333').text('Full-Stack Python Development — Qspiders Training Institute', { indent: 8 });
doc.moveDown(0.2);
doc.fontSize(9).font('Helvetica-Bold').fillColor('#000000').text('Professional Development');
doc.fontSize(8.5).font('Helvetica').fillColor('#333333').text('Web Design, Photoshop; Advanced Digital Marketing, Web Designing', { indent: 8 });
doc.moveDown(0.5);

// 8. Additional Information
drawSectionHeading('ADDITIONAL INFORMATION');
doc.fontSize(9).font('Helvetica-Bold').fillColor('#000000').text('Languages');
doc.fontSize(8.5).font('Helvetica').fillColor('#333333').text('English, Tamil, Telugu', { indent: 8 });

doc.end();

stream.on('finish', () => {
  console.log('PDF updated to match exact resume copy at assets/Sithavan_S_Resume.pdf');
});
