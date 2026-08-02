const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'assets');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const pdfPath = path.join(outputDir, 'Sithavan_S_Resume.pdf');
const doc = new PDFDocument({ margin: 40 });

const stream = fs.createWriteStream(pdfPath);
doc.pipe(stream);

// Header
doc.fontSize(22).font('Helvetica-Bold').fillColor('#003366').text('SITHAVAN S', { align: 'center' });
doc.fontSize(12).font('Helvetica-Bold').fillColor('#444444').text('Java Developer • Software Development', { align: 'center' });
doc.fontSize(9.5).font('Helvetica').fillColor('#666666').text('Chennai, Tamil Nadu | +91 8838547460 | sithavan2311@gmail.com | linkedin.com/in/sithavan16', { align: 'center' });
doc.moveDown(0.5);

// Divider Line
doc.moveTo(40, doc.y).lineTo(570, doc.y).strokeColor('#cccccc').lineWidth(1).stroke();
doc.moveDown(0.8);

// Professional Summary
doc.fontSize(11).font('Helvetica-Bold').fillColor('#003366').text('PROFESSIONAL SUMMARY');
doc.moveDown(0.3);
doc.fontSize(9.5).font('Helvetica').fillColor('#333333').text(
  'Java Software Developer with 8 months of hands-on experience building and maintaining full-stack healthcare applications. Proficient in Java, Spring Boot, RESTful APIs, JWT authentication, and frontend development with React/Next.js. Strong foundation in database design (PostgreSQL, MySQL), Git version control, and object-oriented programming. Seeking a Java Developer role to contribute to scalable, production-grade systems.',
  { align: 'justify' }
);
doc.moveDown(0.8);

// Core Competencies
doc.fontSize(11).font('Helvetica-Bold').fillColor('#003366').text('CORE COMPETENCIES');
doc.moveDown(0.3);
doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#333333').text('Programming Languages: ', { continued: true })
   .font('Helvetica').text('Java, Python, JavaScript, SQL, HTML, CSS');
doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#333333').text('Backend & Frameworks: ', { continued: true })
   .font('Helvetica').text('Spring Boot, RESTful API Design, JWT Authentication, FHIR Integration, Microservices Fundamentals');
doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#333333').text('Frontend: ', { continued: true })
   .font('Helvetica').text('React, Next.js (TypeScript)');
doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#333333').text('Databases & Tools: ', { continued: true })
   .font('Helvetica').text('PostgreSQL, MySQL, Git, API Testing, Object-Oriented Programming');
doc.moveDown(0.8);

// Professional Experience
doc.fontSize(11).font('Helvetica-Bold').fillColor('#003366').text('PROFESSIONAL EXPERIENCE');
doc.moveDown(0.3);

// Qiaben
doc.fontSize(10).font('Helvetica-Bold').fillColor('#111111').text('Java Developer | Qiaben Health Care Solutions', { continued: true })
   .font('Helvetica').fillColor('#666666').text('    Nov 2025 – Jun 2026 | Remote');
doc.moveDown(0.3);

const exp1 = [
  'Developed backend services in Java (Spring Boot) and frontend components in Next.js/TypeScript/React for a full-stack Electronic Health Record (EHR) system.',
  'Implemented core clinical workflows including encounters, assessments, medical history, physical exams, and provider sign-off, plus billing modules (invoices, claims, payments).',
  'Designed secure authentication using JWT and integrated FHIR-based external storage adapters for third-party healthcare system interoperability.',
  'Improved system reliability by implementing safe API response parsing, e-signature workflows, PDF export, and AI voice assistant support for documentation.',
  'Built reusable client-side components to speed up feature development and maintain UI consistency.'
];

exp1.forEach(bullet => {
  doc.fontSize(9).font('Helvetica').fillColor('#333333').text(`•  ${bullet}`, { indent: 10 });
});
doc.moveDown(0.6);

// Barola
doc.fontSize(10).font('Helvetica-Bold').fillColor('#111111').text('IoT Technologies Intern | Barola Technologies', { continued: true })
   .font('Helvetica').fillColor('#666666').text('    Jun 2023 | Remote');
doc.moveDown(0.3);
doc.fontSize(9).font('Helvetica').fillColor('#333333').text('•  Completed hands-on training in IoT fundamentals, sensors, microcontrollers, and embedded systems.', { indent: 10 });
doc.fontSize(9).font('Helvetica').fillColor('#333333').text('•  Built and tested basic IoT modules to collect and monitor real-time sensor data.', { indent: 10 });
doc.moveDown(0.8);

// Projects
doc.fontSize(11).font('Helvetica-Bold').fillColor('#003366').text('PROJECTS');
doc.moveDown(0.3);
doc.fontSize(10).font('Helvetica-Bold').fillColor('#111111').text('Campus Recruitment System | Java Web Application');
doc.fontSize(9).font('Helvetica').fillColor('#333333').text('•  Developed a web-based campus recruitment platform to manage student registrations and job postings.', { indent: 10 });
doc.moveDown(0.4);
doc.fontSize(10).font('Helvetica-Bold').fillColor('#111111').text('Genetic Disorder Prediction Model | Java | Web & Desktop Application');
doc.fontSize(9).font('Helvetica').fillColor('#333333').text('•  Developed web-based and desktop applications in Java for predicting genetic disorders from patient clinical data using machine learning algorithms.', { indent: 10 });
doc.moveDown(0.8);

// Education
doc.fontSize(11).font('Helvetica-Bold').fillColor('#003366').text('EDUCATION');
doc.moveDown(0.3);
doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#111111').text('B.Tech, Information Technology | Adhiyamman College of Engineering (2021 – 2025)');
doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#111111').text('12th Standard (State Board) | St. Vincent Pallotti Matric Higher Sec School (2020 – 2021)');
doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#111111').text('10th Standard (State Board) | DJM Matric Higher Secondary School (2018 – 2019)');

doc.end();

stream.on('finish', () => {
  console.log('PDF generated successfully at assets/Sithavan_S_Resume.pdf');
});
