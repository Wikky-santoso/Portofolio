export const site = {
  name: 'Wikky Santoso',
  role: 'Software Engineer / Full-Stack Developer',
  email: 'wikkysantoso@gmail.com',
  github: 'https://github.com/Wikky-santoso',
  githubLabel: 'github.com/Wikky-santoso',
  linkedin: 'https://www.linkedin.com/in/wikky-santoso-b2140424a/',
  linkedinLabel: 'linkedin.com/in/wikky-santoso',
  resume: 'resume.pdf',
  school: 'Institut Bisnis dan Teknologi Pelita Indonesia',
}

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Selected Works' },
  { id: 'stack', label: 'Tech Stack' },
  { id: 'contact', label: 'Contact' },
]

export const sectionIds = ['top', 'about', 'projects', 'stack', 'journey', 'contact']

export const techStack = [
  {
    number: '01',
    name: 'Frontend',
    items: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
    span: 'md:col-span-7',
  },
  {
    number: '02',
    name: 'Backend',
    items: ['Node.js', 'Express.js', 'REST API'],
    span: 'md:col-span-5',
  },
  {
    number: '03',
    name: 'Database',
    items: ['MongoDB', 'MySQL'],
    span: 'md:col-span-5',
  },
  {
    number: '04',
    name: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Postman'],
    span: 'md:col-span-7',
  },
]

export const projects = [
  {
    id: 'gala-auto-service',
    number: '01',
    category: 'Full-Stack Web Application',
    title: 'Gala Auto Service',
    visual: 'workshop',
    description:
      'A full-stack automotive workshop management system for managing customers, vehicles, service orders, spare parts, inventory, invoices, payments, photo documentation, and operational reports.',
    tech: [
      'React',
      'Vite',
      'Node.js',
      'Express',
      'MongoDB',
      'Mongoose',
      'JWT',
      'Zod',
      'Cloudflare R2',
    ],
    highlights: [
      'Role-based authentication',
      'REST API',
      'Inventory management',
      'Service workflow validation',
      'Invoice and payment management',
      'Cloud image uploads',
      'Operational reporting',
    ],
    detail: {
      overview:
        'Gala Auto Service brings customers, vehicles, service orders, spare parts, inventory, invoices, payments, photo documentation and operational reports together in a single full-stack application built for an automotive workshop.',
      problem:
        'A workshop deals with many connected records: who owns which vehicle, what work was requested, which parts were used and what has been paid. When these live in separate notes or spreadsheets, information gets lost and the state of a job is hard to see.',
      solution:
        'One web application where every record is linked, each role only sees what it needs, and service orders move through a validated workflow. Invoices, payments, photos and reports sit next to the work they belong to.',
      implementation: [
        'React and Vite front end that talks to a REST API built with Node.js and Express.',
        'MongoDB with Mongoose models for customers, vehicles, service orders, parts, invoices and payments.',
        'JWT-based authentication with role-based access control on protected routes.',
        'Zod schemas validate incoming data and the rules of the service workflow.',
        'Photo documentation is uploaded to Cloudflare R2 object storage.',
        'Operational reports built from service, inventory and payment data.',
      ],
    },
  },
  {
    id: 'campus-parking-monitoring',
    number: '02',
    category: 'IoT Prototype',
    title: 'Campus Parking Monitoring System',
    visual: 'parking',
    description:
      'An IoT-based parking monitoring prototype using ESP32 and ultrasonic sensors to detect occupancy and display parking availability through a web dashboard.',
    tech: ['ESP32', 'HC-SR04', 'React', 'Node.js', 'Tailwind CSS', 'MySQL'],
    highlights: [
      'Occupancy detection with ultrasonic sensors',
      'ESP32 microcontroller as the sensor node',
      'Web dashboard for parking availability',
    ],
    detail: {
      overview:
        'A prototype that combines embedded hardware with a web dashboard. An ESP32 reads ultrasonic sensors to work out which parking spaces are taken, and the dashboard shows what is available.',
      problem:
        'Drivers on a campus often have no way to know whether there is a free space until they get to the parking area, which wastes time and adds congestion.',
      solution:
        'Sensors measure each space, the backend stores the readings, and a web dashboard turns them into a clear view of available and occupied spaces.',
      implementation: [
        'ESP32 microcontroller reads distance from HC-SR04 ultrasonic sensors.',
        'A distance threshold decides whether a space is occupied or free.',
        'Readings are sent to a Node.js backend and stored in MySQL.',
        'React and Tailwind CSS dashboard displays parking availability.',
      ],
    },
  },
]

export const journey = [
  {
    label: 'Education',
    title: 'Information Technology',
    subtitle: site.school,
    text: 'Currently studying Information Technology, building the foundations of computing and software with a focus on software engineering.',
  },
  {
    label: 'Foundations',
    title: 'Web fundamentals',
    subtitle: 'HTML, CSS and JavaScript',
    text: 'The base for everything else: structure, styling and behaviour on the web.',
  },
  {
    label: 'Full-stack',
    title: 'Frontend to backend',
    subtitle: 'React, Node.js, MongoDB, MySQL',
    text: 'Building interfaces with React and Tailwind CSS, APIs with Node.js and Express.js, and storing data in MongoDB and MySQL.',
  },
  {
    label: 'Projects',
    title: 'Building real systems',
    subtitle: 'Gala Auto Service / Campus Parking Monitoring',
    text: 'A full-stack workshop management system and an IoT parking prototype with a web dashboard.',
  },
  {
    label: 'Next',
    title: 'Internship & remote roles',
    subtitle: 'Open to opportunities',
    text: 'Looking to apply these skills on a real engineering team and keep learning from the people around me.',
  },
]
