export const starterData = {
  name: "Rohit Kakade",
  role: "Java Full Stack Developer",
  profileImage: "images/RohitProfile.jpg",
  headline: "Turning ideas into reliable, useful web experiences.",
  location: "Pune, Maharashtra, India",
  email: "rohitkakade8336@gmail.com",
  phone: "9324177772",
  github: "https://github.com/Rohitkakade8481",
  linkedin: "https://linkedin.com/in/rohit-kakade-277979379",
  degree: "B.Sc. Computer Science",
  university: "Dr. Babasaheb Ambedkar Marathwada University",
  college: "Bhagwan College of Ashti, Beed",
  graduation: "2025",
  training: "Java Full Stack Developer Course — Kiran Academy",
  objective: "Seeking an entry-level Java Full Stack Developer opportunity where I can contribute to real projects, learn from experienced developers, and continue growing my technical skills.",
  about: "I am a Computer Science graduate interested in Java Full Stack Development. I enjoy building practical applications, learning new technologies, and solving problems step by step. My learning includes Java, Spring Boot, REST APIs, React, and relational databases.I am passionate about improving my technical skills, writing clean and maintainable code, and learning industry-standard development practices. My goal is to grow as a Software Developer, contribute to meaningful projects, collaborate with experienced professionals, and build reliable software solutions.",
  interests: "Learning new technologies, reading books, and swimming.",
  skills: [
    { category: "Backend Development", items: ["Core Java", "OOP", "Spring Boot", "REST APIs", "Spring Data JPA", "Hibernate"] },
    { category: "Frontend Development", items: ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS"] },
    { category: "Database", items: ["MySQL", "SQL"] },
    { category: "Tools & Workflow", items: ["Git", "GitHub", "Maven", "Postman", "VS Code", "Eclipse"] }
  ],
  projects: [
    {
      name: "Attend-Pro",
      image: "/images/attend-pro-preview.svg",
      type: "Full Stack Project",
      shortDescription: "A student attendance management interface with React screens and Spring Boot REST API integration.",
      description: "A Student Attendance Management System for organizing attendance records through a web interface, with separate admin and faculty views and REST API integration.",
      overview: "Attend-Pro is a portfolio project focused on making student attendance workflows easier to manage than scattered manual records. It combines a React frontend with a Java Spring Boot backend and a relational database layer. The UI includes role-oriented admin and faculty dashboards. Verify the exact features and current repository state before presenting it as production-ready.",
      problem: "Manual attendance tracking can make it difficult to keep records organized, find information quickly, and maintain a consistent workflow across staff members.",
      solution: "Provide a web-based interface for attendance-related workflows, connect the UI to REST endpoints, and organize backend logic into controller, service, and data-access responsibilities.",
      features: ["React + Vite frontend with responsive dashboard screens", "Admin and faculty views selected from the signed-in user's role in the frontend", "REST API integration between the frontend and Spring Boot backend", "Attendance record data model and CRUD-oriented workflow", "Spring Data JPA persistence layer", "Reusable UI components and navigation", "Repository-based version control and project documentation"],
      implementation: "The frontend is built with React, Vite, Tailwind CSS, and Axios for API requests. The backend uses Java 17 and Spring Boot REST controllers, with service and DAO/repository layers and Spring Data JPA for persistence. The data flow is: user action → React component → Axios request → REST controller → service/repository → database → HTTP response → UI update. Frontend role-based routing is a user-interface convenience; it is not a substitute for backend authorization.",
      apiDetails: "Describe the exact endpoints from your current source code before an interview. Explain request methods, request/response bodies, status codes, validation, and error handling based on what is actually implemented.",
      challenges: "Connecting the frontend to REST endpoints requires consistent data shapes, correct API URLs, and clear handling of loading and error states. Another important design consideration is keeping frontend route visibility separate from real server-side access control.",
      learnings: "Practiced component-based React UI development, REST API integration, Java Spring Boot layering, relational persistence concepts, and explaining the end-to-end request lifecycle.",
      futureImprovements: "Add backend authentication and role-based authorization, improve validation and centralized exception handling, add automated tests, configure environment-specific API URLs, and deploy the frontend and backend with secure configuration.",
      contribution: "Use this field to describe the modules you personally implemented. Suggested areas to verify: React pages, API integration, Spring Boot endpoints, entity/repository design, testing, and documentation.",
      role: "Full-stack project developer ",
      status: "web project",
      duration: "90 hrs",
      tech: ["React", "Vite", "Tailwind CSS", "Axios", "Java 17", "Spring Boot", "Spring Data JPA", "MySQL"],
      github: "https://github.com/Rohitkakade8481/Attend-pro",
      demo: "",
      featured: true
    },
    {
      name: "Spring Boot CRUD API",
      image: "/images/crud-api-preview.svg",
      type: "Backend Practice",
      shortDescription: "A Java Spring Boot REST API for CRUD operations with database persistence.",
      description: "A backend practice project focused on creating, reading, updating, and deleting records through REST endpoints using Spring Boot and database integration.",
      overview: "This project demonstrates the core structure of a Java backend service that exposes REST endpoints for managing records. Update the resource name, exact fields, and implemented endpoints to match the repository.",
      problem: "Applications need a predictable way to create, retrieve, modify, and remove records without directly accessing the database from the client.",
      solution: "Expose REST endpoints from Spring Boot and use a persistence layer to perform CRUD operations against a relational database.",
      features: ["Create a record through an HTTP request", "Retrieve record details and collections", "Update existing record data", "Delete records when supported by the API", "Separate controller and persistence responsibilities", "Test endpoints using Postman", "Database integration for persistent records"],
      implementation: "A client sends an HTTP request to a Spring Boot REST controller. The controller delegates to the appropriate application logic and repository/data-access layer. The persistence layer communicates with the database and the API returns a response to the client. Align this description with the current source code and exact package structure.",
      apiDetails: "Add your actual endpoint paths, HTTP methods, example request bodies, response bodies, and status codes after checking your Postman collection or controller classes.",
      challenges: "Typical learning areas include mapping request data to entities, handling missing records, configuring database connections, and returning appropriate responses for CRUD operations.",
      learnings: "Practiced Spring Boot project structure, REST conventions, database persistence, API testing with Postman, and debugging backend request flows.",
      futureImprovements: "Add DTOs, validation, centralized exception handling, pagination, automated unit/integration tests, and authentication if required by the use case.",
      contribution: "Describe the exact API endpoints, entities, repositories, validation, and tests you personally wrote.",
      role: "Backend developer ",
      status: "crud project",
      duration: "70 hrs",
      tech: ["Java", "Spring Boot", "REST API", "Spring Data JPA", "MySQL", "Postman"],
      github: "https://github.com/Rohitkakade8481/springboot-crud-backend",
      demo: "",
      featured: true
    }
  ],
  certificates: [
    {
      title: " Java Full Stack Development",
      issuer: "The kiran Academy",
      year: "2025",
      description: "Completed training in Core Java, OOP, Spring Boot, REST APIs, React, MySQL, and full-stack application development.",
      link: "https://drive.google.com/file/d/1wifugQa-CZTGkkdAzBwYhE-AD0DobYZ8/view?usp=drive_link"
    },
    {
      title: " React.js Development",
      issuer: "Brand neck Academy",
      year: "2025",
      description: "Learned React components, props, state, hooks, routing, API integration, and responsive UI development.",
      link: "https://drive.google.com/file/d/1wsd5eK198teQ6TWpO1SIRxmYBlzy2kQG/view?usp=drive_link"
    }
  ],
  experience: [],
  achievements: []
};

export const starterCertificates = [

];
