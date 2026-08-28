import type { ModuleData } from '../types/course';

export const module7Data: ModuleData = {
  id: 7,
  title: 'Module 7: Access Modifiers, Packages & Constructor Chaining',
  subtitle: 'Day 5 (Part 2) · Encapsulation Boundaries, Package Namespaces, Imports & Constructor Chaining',
  day: 5,
  estimatedHours: 4,
  description:
    'Master access control across package boundaries, package namespace folder mappings, static imports, and explicit constructor chaining using this() and super().',
  topicsCovered: [
    'The 4 Access Modifiers (private, default, protected, public)',
    'Access Modifier Visibility Matrix',
    'Protected Access Rules Outside Package (Subclass Inheritance Only)',
    'Package Structure & Directory Mapping (com.training.model)',
    'import Statements & static import (Math.PI, Math.sqrt)',
    'Constructor Chaining in Same Class (this())',
    'Constructor Chaining in Parent Class (super())',
    'Constructor Execution Lifecycle Order (Object -> Parent -> Child)',
  ],
  concepts: [
    {
      id: 'm7-access-modifiers',
      title: 'Access Modifiers & Boundary Matrix',
      shortIdea: 'Java regulates visibility via 4 levels: private (class), default (package), protected (+subclasses), public (world).',
      moduleNumber: 7,
      dayNumber: 5,
      category: 'Access Control',
      customVisualizer: 'access-matrix',
      visualExplanation: {
        title: 'Visibility Boundary Matrix',
        diagramText: `
 ┌───────────┬────────────┬──────────────┬───────────────────┬───────────────┐
 │ Modifier  │ Same Class │ Same Package │ Subclass (Diff Pkg)│ Other Package │
 ├───────────┼────────────┼──────────────┼───────────────────┼───────────────┤
 │ private   │     ✓      │      ✗       │        ✗          │       ✗       │
 │ default   │     ✓      │      ✓       │        ✗          │       ✗       │
 │ protected │     ✓      │      ✓       │        ✓*         │       ✗       │
 │ public    │     ✓      │      ✓       │        ✓          │       ✓       │
 └───────────┴────────────┴──────────────┴───────────────────┴───────────────┘
 * protected in a different package is ONLY accessible via inheritance (extends), NOT by direct object creation!
        `,
        note: 'Default (no keyword) is package-private. Protected is package-private PLUS accessible to child classes in any other package.',
      },
      javaExample: `// Package: com.training.model
package com.training.model;

public class Employee {
    public String name = "Rajesh";       // Accessible everywhere
    protected double salary = 85000.0;   // Accessible in package + child classes
    String department = "Engineering";   // Default: package-only
    private String ssn = "XXX-XX-1234";  // Only inside Employee class

    public void showPublicInfo() {
        System.out.println("Public Name: " + name);
        System.out.println("Private SSN (Internal only): " + ssn);
    }
}`,
      expectedOutput: `Public Name: Rajesh
Private SSN (Internal only): XXX-XX-1234`,
      tryItCode: `package com.training.service;
import com.training.model.Employee;

// Subclass in a DIFFERENT package
public class Manager extends Employee {
    public void displayManagerInfo() {
        System.out.println("Manager: " + name);     // OK: public
        System.out.println("Salary: $" + salary);   // OK: protected via inheritance!
        // System.out.println(department);          // ERROR! default not visible outside package
    }

    public static void main(String[] args) {
        new Manager().displayManagerInfo();
    }
}`,
      teachingMode: {
        explain2Min: [
          'private: accessible ONLY within the enclosing curly braces of the class.',
          'default (no keyword): accessible to any class in the SAME package.',
          'protected: accessible in same package PLUS child classes (subclasses) in DIFFERENT packages.',
          'public: open to the entire world across all packages.',
        ],
        drawTips:
          'Draw 4 concentric circles or a 4-room house: 1. Inner private room 2. Family living room (Default package) 3. Extended family patio (Protected) 4. Public street sidewalk.',
        codeHighlight: 'Highlight the special protected rule: Subclass in package B CAN access protected field via super or inheritance, but cannot do new Employee().salary.',
        studentQuestion: 'If class A and class B are in different packages, can class B access a default (package-private) method of class A?',
        studentAnswer: 'No! Default (package-private) methods can only be accessed by classes belonging to the exact same package.',
      },
      quizzes: [
        {
          id: 'q7-1',
          question: 'Which access modifier allows access from subclasses in another package, but denies access to non-subclasses in that same other package?',
          options: ['public', 'protected', 'default (package-private)', 'private'],
          correctAnswerIndex: 1,
          explanation: 'protected provides package-level access plus access to subclasses in any other package via inheritance.',
        },
      ],
    },
    {
      id: 'm7-packages-imports',
      title: 'Packages & Static Imports',
      shortIdea: 'Packages organize namespaces and prevent naming collisions; static imports allow direct access to static members.',
      moduleNumber: 7,
      dayNumber: 5,
      category: 'Architecture',
      customVisualizer: 'package-tree',
      visualExplanation: {
        title: 'Package Folder Hierarchy & Imports',
        diagramText: `
  Project Directory Root
  └── src/
      └── com/
          └── training/
              ├── model/
              │   └── Student.java       (package com.training.model;)
              └── service/
                  └── StudentService.java(package com.training.service;)
                                         (import com.training.model.Student;)
        `,
        note: 'Reverse domain name convention (e.g., com.company.project) guarantees global package uniqueness.',
      },
      javaExample: `// Static import demonstration
import static java.lang.Math.PI;
import static java.lang.Math.sqrt;
import static java.lang.Math.pow;

public class GeometryHelper {
    public static void main(String[] args) {
        double radius = 7.0;
        
        // Notice we call PI and pow() directly without Math.PI or Math.pow()!
        double circleArea = PI * pow(radius, 2);
        double hypotenuse = sqrt(pow(3, 2) + pow(4, 2));

        System.out.println("Circle Area: " + String.format("%.2f", circleArea));
        System.out.println("Hypotenuse (3, 4): " + hypotenuse);
    }
}`,
      expectedOutput: `Circle Area: 153.94
Hypotenuse (3, 4): 5.0`,
      teachingMode: {
        explain2Min: [
          'Package = folder directory structure on disk matching the package statement.',
          'Prevents naming conflicts: com.google.User vs com.facebook.User can coexist in the same JVM.',
          'import statement brings a class into current file namespace so you don\'t have to type full qualified name.',
          'static import imports static members/methods (e.g. import static java.lang.Math.PI;) for scannable math/utility code.',
        ],
        drawTips: 'Draw a folder tree on the board showing src/com/training/model and show how it matches the package declaration.',
        codeHighlight: 'Show how static import allows writing sqrt(25) instead of Math.sqrt(25).',
        studentQuestion: 'Does "import java.util.*;" load all subpackages like java.util.concurrent into memory?',
        studentAnswer: 'No! The wildcard * in import statements only imports classes in that immediate package (java.util), not classes inside nested subpackages.',
      },
      quizzes: [
        {
          id: 'q7-2',
          question: 'What is the primary purpose of packages in Java?',
          options: [
            'To make code run 2x faster',
            'To group related classes, avoid naming conflicts, and control access',
            'To automatically compile all files into a single .exe',
            'To eliminate the need for constructors',
          ],
          correctAnswerIndex: 1,
          explanation: 'Packages provide namespace organization, prevent class name collisions, and enforce access protection boundaries.',
        },
      ],
    },
    {
      id: 'm7-constructor-chaining',
      title: 'Constructor Chaining: this() and super()',
      shortIdea: 'this() calls another constructor in the same class; super() invokes the parent class constructor. Both must be the first line.',
      moduleNumber: 7,
      dayNumber: 5,
      category: 'Object Construction',
      customVisualizer: 'constructor-chain',
      visualExplanation: {
        title: 'Constructor Chaining & Execution Order',
        diagramText: `
 1. this() Chaining (Same Class):
    Student() ────► calls this("Default", 18) ────► Student(name, age)

 2. super() Chaining (Inheritance Chain):
    Child Constructor
          │
          ▼  super()
    Parent Constructor
          │
          ▼  super()
    Object Constructor (Root)

 * Execution order evaluates top-down from Object down to Child!
        `,
        note: 'Rule: this() or super() MUST be the very first statement inside a constructor body. You cannot use both in the same constructor!',
      },
      diagramImage: {
        src: '/images/java_constructor_chaining_lifecycle.jpg',
        alt: 'Lifecycle Order of Java Constructor Chaining Diagram',
        caption: 'Lifecycle order: Phase 1 Upward Delegation builds the call stack (Student -> Person -> Object); Phase 2 Downward Execution initializes Object first, then Person, and Student completes last.',
      },
      javaExample: `class Person {
    String name;

    Person(String name) {
        // super(); (implicitly called to Object)
        this.name = name;
        System.out.println("1. Person constructor executed for: " + name);
    }
}

class Student extends Person {
    int rollNumber;

    // 0-argument constructor delegates to 1-arg constructor
    Student() {
        this("Unknown Student", 999); // calls sibling constructor
        System.out.println("3. Student() 0-arg constructor finished");
    }

    // Parameterized constructor
    Student(String name, int roll) {
        super(name); // calls Parent constructor (Person)
        this.rollNumber = roll;
        System.out.println("2. Student(name, roll) constructor executed");
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("Constructing new Student():");
        Student s = new Student();
    }
}`,
      expectedOutput: `Constructing new Student():
1. Person constructor executed for: Unknown Student
2. Student(name, roll) constructor executed
3. Student() 0-arg constructor finished`,
      tryItCode: `class Vehicle {
    Vehicle() { System.out.println("Vehicle initialized"); }
}

class Bike extends Vehicle {
    Bike() {
        super();
        System.out.println("Bike initialized");
    }
}

public class Main {
    public static void main(String[] args) {
        new Bike();
    }
}`,
      teachingMode: {
        explain2Min: [
          'Constructor Chaining: Calling one constructor from another either in the same class (this()) or superclass (super()).',
          'Rule 1: Either this() or super() MUST be the FIRST statement in a constructor.',
          'Rule 2: If you do not write super() or this(), Java automatically inserts an invisible "super();" call to the parent no-arg constructor.',
          'Execution Order: Root (Object) -> Parent -> Child.',
        ],
        drawTips:
          'Draw vertical domino chain: Person() on top -> Student(name, roll) in middle -> Student() at bottom. Show arrow going up to super() then executing down.',
        codeHighlight: 'Notice output numbers: Person (1) executes before Student parameterized (2), which finishes before Student no-arg (3).',
        studentQuestion: 'Why does Java mandate that super() or this() must be the very first statement in a constructor?',
        studentAnswer: 'Because before a child object initializes its own fields, the parent state must be fully initialized and constructed to maintain object integrity and prevent accessing uninitialized parent state.',
      },
      quizzes: [
        {
          id: 'q7-3',
          question: 'Where must a this() or super() call appear inside a constructor body?',
          options: [
            'Anywhere in the constructor',
            'Must be the very first statement in the constructor',
            'Must be the very last statement before return',
            'Inside a finally block',
          ],
          correctAnswerIndex: 1,
          explanation: 'Java requires this() or super() constructor delegation to be the first statement to ensure parent/base initialization occurs before child initialization.',
        },
      ],
    },
  ],
  miniChallenge: {
    id: 'ch-m7',
    moduleNumber: 7,
    title: 'Challenge 7: Multi-tier Constructor Chain & Access Guard',
    difficulty: 'Core OOP',
    problem:
      'Design a `Vehicle` -> `Car` inheritance hierarchy. `Vehicle` holds protected `brand` and initializes it via constructor. `Car` provides constructors chaining `this()` and `super()`, plus a method displaying car specifications.',
    starterCode: `class Vehicle {
    protected String brand;
    // TODO: Vehicle constructor
}

class Car extends Vehicle {
    private String model;
    private int year;

    // TODO: Constructor chaining using this() and super()
}

public class ChainingApp {
    public static void main(String[] args) {
        // TODO: Instantiate and test
    }
}`,
    expectedOutput: `[Vehicle Initialized: Tesla]
[Car Model Set: Model 3, Year: 2026]
Vehicle: Tesla Model 3 (2026)`,
    hints: [
      'Create Vehicle(String brand) that prints initialization message.',
      'In Car, create Car(String brand, String model) that calls this(brand, model, 2026).',
      'In Car(String brand, String model, int year), call super(brand).',
    ],
    solutionCode: `class Vehicle {
    protected String brand;

    Vehicle(String brand) {
        this.brand = brand;
        System.out.println("[Vehicle Initialized: " + brand + "]");
    }
}

class Car extends Vehicle {
    private String model;
    private int year;

    // Delegating constructor using this()
    Car(String brand, String model) {
        this(brand, model, 2026); // Default year
    }

    // Master constructor calling super()
    Car(String brand, String model, int year) {
        super(brand);
        this.model = model;
        this.year = year;
        System.out.println("[Car Model Set: " + model + ", Year: " + year + "]");
    }

    void displaySpecs() {
        System.out.println("Vehicle: " + brand + " " + model + " (" + year + ")");
    }
}

public class ChainingApp {
    public static void main(String[] args) {
        Car car = new Car("Tesla", "Model 3");
        car.displaySpecs();
    }
}`,
    explanation:
      'Demonstrates constructor chaining with this() delegation, parent super() constructor initialization, protected field inheritance, and output lifecycle order.',
  },
};
