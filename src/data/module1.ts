import type { ModuleData } from '../types/course';

export const module1Data: ModuleData = {
  id: 1,
  title: 'Module 1: Introduction to Java & Environment',
  subtitle: 'Day 1 (Part 1) · Java Philosophy, JVM/JRE/JDK Architecture, Compilation & First Program',
  day: 1,
  estimatedHours: 2,
  description:
    'Foundational overview of Java as a platform-independent, object-oriented language. Understand how javac and the JVM bridge source code to hardware execution.',
  topicsCovered: [
    'Introduction to Java',
    'History & Origins (Gosling, Sun Microsystems)',
    'Types of Programming Languages (Compiled vs Interpreted vs Hybrid)',
    'Key Java Features (WORA, OOP, Robust, Secure)',
    'Java Editions (Java SE, Jakarta EE, Java ME)',
    'Development Environment (JDK vs JRE vs JVM)',
    'Compilation & Execution Pipeline (javac -> .class -> JVM)',
    'First Java Program Anatomy & main() Breakdown',
  ],
  concepts: [
    {
      id: 'm1-what-is-java',
      title: 'What is Java & Key Features',
      shortIdea: 'A class-based, object-oriented, platform-independent language built on "Write Once, Run Anywhere" (WORA).',
      moduleNumber: 1,
      dayNumber: 1,
      category: 'Foundations',
      customVisualizer: 'compilation-flow',
      visualExplanation: {
        title: 'The Core Philosophy: WORA & Architecture Neutrality',
        diagramText: `
  [ MyCode.java ] (Human-readable Source)
         │
         ▼  (javac compiler)
  [ MyCode.class ] (Bytecode - Platform Independent)
         │
    ┌────┼──────────────┐
    ▼    ▼              ▼
 [ JVM Windows ] [ JVM macOS ] [ JVM Linux ]
    │    │              │
    ▼    ▼              ▼
  Windows OS     macOS         Linux OS
        `,
        note: 'Java achieves portability because the Java Virtual Machine (JVM) interprets bytecode into native machine instructions for each target OS.',
      },
      javaExample: `// First Look: Clean, Self-Contained Java Class
public class Welcome {
    public static void main(String[] args) {
        System.out.println("Welcome to Java Short-Term Training 2026!");
        System.out.println("Platform Independent: Bytecode runs anywhere with a JVM.");
    }
}`,
      expectedOutput: `Welcome to Java Short-Term Training 2026!
Platform Independent: Bytecode runs anywhere with a JVM.`,
      tryItCode: `public class Welcome {
    public static void main(String[] args) {
        String course = "Mastering Programming using Java";
        int durationHours = 20;
        System.out.println("Course: " + course);
        System.out.println("Duration: " + durationHours + " Hours (5 Days)");
    }
}`,
      teachingMode: {
        explain2Min: [
          'Created by James Gosling at Sun Microsystems in 1995 (now owned by Oracle).',
          'Unlike pure C/C++ (compiled directly to machine code) or Python (interpreted), Java is HYBRID: compiled to Bytecode (.class), then interpreted/JIT-compiled by the JVM.',
          'Key buzzwords: Object-Oriented, Platform-Independent (WORA), Robust (strong memory management & garbage collection), Secure (no raw pointers).',
        ],
        drawTips:
          'Sketch on whiteboard: Box 1 [Source .java] -> Arrow (javac) -> Box 2 [Bytecode .class] -> 3 Split Arrows to Windows JVM, Mac JVM, Linux JVM.',
        codeHighlight: 'Emphasize that the file name MUST match the public class name (Welcome.java).',
        studentQuestion: 'Why does C++ need to be recompiled for Windows and Linux separately, but Java .class files can run on both without recompilation?',
        studentAnswer: 'Because C++ compiles directly to CPU-specific native machine code, whereas Java compiles to universal Bytecode which the OS-specific JVM executes.',
      },
      quizzes: [
        {
          id: 'q1-1',
          question: 'What is the output file format produced by the Java compiler (javac)?',
          options: ['.exe binary', '.class bytecode file', '.jar archive', '.obj machine code'],
          correctAnswerIndex: 1,
          explanation: 'javac compiles .java source files into universal .class bytecode files that the JVM understands.',
        },
        {
          id: 'q1-2',
          question: 'Which component is responsible for executing bytecode on a target operating system?',
          options: ['JDK', 'JVM', 'JRE Editor', 'javac'],
          correctAnswerIndex: 1,
          explanation: 'The JVM (Java Virtual Machine) loads and executes bytecode, converting it to machine instructions.',
        },
      ],
    },
    {
      id: 'm1-jdk-jre-jvm',
      title: 'JDK vs JRE vs JVM Ecosystem',
      shortIdea: 'JDK is for developers (tools + compiler), JRE is for running apps (libraries + JVM), JVM is the virtual engine.',
      moduleNumber: 1,
      dayNumber: 1,
      category: 'Environment',
      visualExplanation: {
        title: 'Nested Ecosystem Architecture',
        diagramText: `
 ┌─────────────────────────────────────────────────────────────┐
 │ JDK (Java Development Kit)                                  │
 │   javac (compiler), javadoc, jdb (debugger), jar tool       │
 │                                                             │
 │  ┌────────────────────────────────────────────────────────┐ │
 │  │ JRE (Java Runtime Environment)                         │ │
 │  │   Java Standard Class Libraries (rt.jar / core libs)   │ │
 │  │                                                        │ │
 │  │  ┌───────────────────────────────────────────────────┐ │ │
 │  │  │ JVM (Java Virtual Machine)                        │ │ │
 │  │  │   ClassLoader │ Bytecode Verifier │ JIT Compiler │ │ │
 │  │  │   Garbage Collector │ Execution Engine            │ │ │
 │  │  └───────────────────────────────────────────────────┘ │ │
 │  └────────────────────────────────────────────────────────┘ │
 └─────────────────────────────────────────────────────────────┘
        `,
        note: 'Developers need JDK. End users who only run programs only need JRE/JVM.',
      },
      diagramImage: {
        src: '/images/jvm_jre_jdk_architecture.jpg',
        alt: 'JDK vs JRE vs JVM Nested Architecture Diagram',
        caption: 'Architecture breakdown: JDK contains developer tools and JRE; JRE contains core libraries and JVM; JVM contains ClassLoader, Memory areas, and Execution Engine.',
      },
      javaExample: `// Checking Java Runtime Environment Properties
public class SystemInfo {
    public static void main(String[] args) {
        System.out.println("Java Version: " + System.getProperty("java.version"));
        System.out.println("JVM Architecture: " + System.getProperty("os.arch"));
        System.out.println("Java Vendor: " + System.getProperty("java.vendor"));
    }
}`,
      expectedOutput: `Java Version: 17.0.10 (or current JDK)
Compiler: javac 17.0.10
Vendor: Oracle / OpenJDK`,
      teachingMode: {
        explain2Min: [
          'JDK = JRE + Development Tools (javac, jdb, jar).',
          'JRE = JVM + Core Standard Libraries (java.lang, java.util, etc.).',
          'JVM = Execution Engine (ClassLoader, Memory Areas, JIT Compiler, Garbage Collector).',
        ],
        drawTips: 'Draw 3 concentric rectangles on the whiteboard like Russian nesting dolls: JVM inside JRE inside JDK.',
        codeHighlight: 'System.getProperty() demonstrates accessing the underlying JVM runtime info.',
        studentQuestion: 'If a client company only wants to run your packaged banking software on their server, do they need to install the full JDK?',
        studentAnswer: 'No, they only need the JRE (or bundled runtime) to execute bytecode, not the developer tools like javac.',
      },
      quizzes: [
        {
          id: 'q1-3',
          question: 'Which of the following contains the javac compiler?',
          options: ['JVM only', 'JRE only', 'JDK', 'Any web browser'],
          correctAnswerIndex: 2,
          explanation: 'JDK (Java Development Kit) contains developer tools including javac. JRE and JVM only provide runtime capabilities.',
        },
      ],
    },
    {
      id: 'm1-first-program',
      title: 'First Program & main() Method Anatomy',
      shortIdea: 'Every standalone Java application begins execution in public static void main(String[] args).',
      moduleNumber: 1,
      dayNumber: 1,
      category: 'Syntax',
      customVisualizer: 'main-method',
      visualExplanation: {
        title: 'Deconstructing public static void main',
        diagramText: `
 public static void main(String[] args)
   │      │    │    │          │
   │      │    │    │          └─ Array of CLI arguments
   │      │    │    └─ Method identifier searched by JVM
   │      │    └─ Returns nothing to the OS
   │      └─ Callable without instantiating the class object
   └─ Accessible globally from outside the class by JVM
        `,
        note: 'System.out.println: System is a built-in class, out is a static PrintStream field, println() is an instance method.',
      },
      javaExample: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java World!");
        System.out.print("Learning ");
        System.out.print("Java ");
        System.out.println("Step-by-Step!");
    }
}`,
      expectedOutput: `Hello, Java World!
Learning Java Step-by-Step!`,
      tryItCode: `public class Main {
    public static void main(String[] args) {
        int day = 1;
        String topic = "Java Environment & Syntax";
        System.out.println("Day " + day + ": " + topic);
    }
}`,
      teachingMode: {
        explain2Min: [
          'public: JVM must call this method from outside the class package.',
          'static: JVM does not need to create an instance of Main to start running.',
          'void: JVM expects no return value upon application launch.',
          'String[] args: Command-line arguments passed as an array of strings.',
        ],
        drawTips: 'Write public static void main on the board and circle each keyword with arrows explaining their specific necessity.',
        codeHighlight: 'Difference between print() (no newline) vs println() (appends newline).',
        studentQuestion: 'What happens if we remove the keyword "static" from the main method in Java?',
        studentAnswer: 'The code will compile fine, but at runtime the JVM will throw a NoSuchMethodError: Main method not found in class, please define the main method as: public static void main(String[] args).',
      },
      quizzes: [
        {
          id: 'q1-4',
          question: 'Why is the main() method declared as "static" in Java?',
          options: [
            'To make the program run faster',
            'So the JVM can invoke it without creating an object of the containing class',
            'To prevent any other class from accessing it',
            'Because Java does not support non-static methods',
          ],
          correctAnswerIndex: 1,
          explanation: 'Declaring main static allows the JVM launcher to call Main.main(args) directly without allocating a class instance first.',
        },
      ],
    },
  ],
  miniChallenge: {
    id: 'ch-m1',
    moduleNumber: 1,
    title: 'Challenge 1: Student Profile Printer',
    difficulty: 'Beginner',
    problem:
      'Write a complete Java class named `StudentProfile` with a `main` method that prints a formatted student ID card containing: Name, Course, Batch Year, and a motivational slogan on 4 separate lines.',
    starterCode: `public class StudentProfile {
    public static void main(String[] args) {
        // TODO: Print student profile details
        
    }
}`,
    expectedOutput: `=== STUDENT ID CARD ===
Name: Rahul Sharma
Course: Mastering Java 2026
Batch: 2026-STT
Goal: Master OOP & Design Patterns!
=======================`,
    hints: [
      'Use System.out.println() for each line of the ID card.',
      'Declare variables for name and course if desired, or print formatted strings directly.',
    ],
    solutionCode: `public class StudentProfile {
    public static void main(String[] args) {
        String name = "Rahul Sharma";
        String course = "Mastering Java 2026";
        String batch = "2026-STT";
        String goal = "Master OOP & Design Patterns!";

        System.out.println("=== STUDENT ID CARD ===");
        System.out.println("Name: " + name);
        System.out.println("Course: " + course);
        System.out.println("Batch: " + batch);
        System.out.println("Goal: " + goal);
        System.out.println("=======================");
    }
}`,
    explanation:
      'Demonstrates class structure, main method declaration, string variable declaration, and string concatenation using the + operator with System.out.println.',
  },
};
