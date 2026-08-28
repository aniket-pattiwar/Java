import type { ModuleData } from '../types/course';

export const module3Data: ModuleData = {
  id: 3,
  title: 'Module 3: Object-Oriented Programming (OOP) Foundations',
  subtitle: 'Day 2 · Classes, Objects, State & Behavior, and the 4 Pillars of OOP',
  day: 2,
  estimatedHours: 4,
  description:
    'Transition from procedural programming to object-oriented design. Understand the blueprint-instance relationship, state encapsulation, method behaviors, and the 4 fundamental OOP pillars.',
  topicsCovered: [
    'Why OOP? Real-World Problem Modeling',
    'Class as a Blueprint vs Object as a Living Instance',
    'State (Instance Variables) and Behavior (Methods)',
    'The 4 Pillars of OOP Overview (Encapsulation, Abstraction, Inheritance, Polymorphism)',
    'Class Declaration Syntax & Rules',
    'Object Instantiation using the new Keyword',
    'Accessing Fields and Invoking Methods (Dot Operator)',
    'Multiple Object Instances with Independent State',
  ],
  concepts: [
    {
      id: 'm3-class-object',
      title: 'Class vs Object (Blueprint vs Instance)',
      shortIdea: 'A class is a blueprint; an object is an independent concrete instance created in heap memory.',
      moduleNumber: 3,
      dayNumber: 2,
      category: 'OOP Foundations',
      visualExplanation: {
        title: 'Class Blueprint to Multiple Living Instances',
        diagramText: `
 ┌─────────────────────────────────────────┐
 │             Car Class (Blueprint)       │
 │  State (Fields): color, speed, model    │
 │  Behavior (Methods): accelerate(), ...  │
 └────────────────────┬────────────────────┘
                      │
             new Car()│ (Instantiations)
         ┌────────────┴────────────┐
         ▼                         ▼
 ┌───────────────────────┐ ┌───────────────────────┐
 │ Object: car1          │ │ Object: car2          │
 │  model = "Sedan"      │ │  model = "SUV"        │
 │  color = "Red"        │ │  color = "Blue"       │
 │  speed = 60           │ │  speed = 0            │
 └───────────────────────┘ └───────────────────────┘
        `,
        note: 'Each object has its own separate memory copy of instance variables, but shares method code definition.',
      },
      diagramImage: {
        src: '/images/java_class_blueprint_heap_objects.jpg',
        alt: 'Java Class Blueprint vs Living Heap Objects Diagram',
        caption: 'Blueprint vs Instances: Class Car in code acts as the blueprint. Calling new Car() allocates separate memory in the Heap for car1 (Red Civic) and car2 (Black Fortuner) with independent state.',
      },
      javaExample: `// Class definition (Blueprint)
class Car {
    String model;
    String color;
    int speed;

    void start() {
        System.out.println(model + " (" + color + ") engine started.");
    }

    void accelerate(int increase) {
        speed += increase;
        System.out.println(model + " accelerated to " + speed + " km/h");
    }
}

public class Main {
    public static void main(String[] args) {
        Car car1 = new Car();
        car1.model = "Honda Civic";
        car1.color = "Red";
        car1.start();
        car1.accelerate(40);

        Car car2 = new Car();
        car2.model = "Toyota Fortuner";
        car2.color = "Black";
        car2.start();
        car2.accelerate(70);
    }
}`,
      expectedOutput: `Honda Civic (Red) engine started.
Honda Civic accelerated to 40 km/h
Toyota Fortuner (Black) engine started.
Toyota Fortuner accelerated to 70 km/h`,
      tryItCode: `class Student {
    String name;
    int rollNumber;

    void introduce() {
        System.out.println("Hello, I am " + name + " [Roll #" + rollNumber + "]");
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();
        s1.name = "Rahul";
        s1.rollNumber = 101;
        s1.introduce();

        Student s2 = new Student();
        s2.name = "Sneha";
        s2.rollNumber = 102;
        s2.introduce();
    }
}`,
      teachingMode: {
        explain2Min: [
          'Class: architectural blueprint / cookie cutter. Takes zero memory until instantiated.',
          'Object: actual house / cookie. Takes memory in Heap when "new" is called.',
          'State: what an object KNOWS (variables/fields like color, balance, name).',
          'Behavior: what an object DOES (methods/functions like accelerate(), deposit(), print()).',
        ],
        drawTips:
          'Draw an architectural blueprint paper labeled "Class Car". Then draw two distinct physical houses labeled "car1" and "car2" with different door colors.',
        codeHighlight: 'Highlight the "new" operator which allocates memory in Heap and returns a reference address.',
        studentQuestion: 'If car1.accelerate(50) is called, does car2\'s speed change as well?',
        studentAnswer: 'No! car1 and car2 are independent objects with distinct, separate memory allocations in the Heap. Modifying car1 has zero effect on car2.',
      },
      quizzes: [
        {
          id: 'q3-1',
          question: 'What is the relationship between a Class and an Object in Java?',
          options: [
            'A Class is an instance of an Object',
            'A Class is a compile-time template; an Object is a runtime instance created from that template',
            'Classes and Objects are identical terms in Java',
            'An Object exists at compile-time and a Class exists at runtime',
          ],
          correctAnswerIndex: 1,
          explanation: 'A Class is the code template/blueprint; calling new ClassName() constructs a distinct runtime Object in Heap memory.',
        },
      ],
    },
    {
      id: 'm3-four-pillars',
      title: 'The 4 Pillars of OOP Overview',
      shortIdea: 'Encapsulation, Abstraction, Inheritance, and Polymorphism form the architectural backbone of Java.',
      moduleNumber: 3,
      dayNumber: 2,
      category: 'OOP Principles',
      visualExplanation: {
        title: 'The 4 Fundamental OOP Pillars at a Glance',
        diagramText: `
  ┌────────────────────────────────────────────────────────────────────────┐
  │ 1. ENCAPSULATION                                                       │
  │    Data Hiding & Protection: Bundle fields + methods with private/getters│
  │    Analogy: Capsule pill enclosing internal medicine                   │
  ├────────────────────────────────────────────────────────────────────────┤
  │ 2. ABSTRACTION                                                         │
  │    Hiding complex implementation details, exposing clean interface     │
  │    Analogy: Car brake pedal (you press pedal, don't worry about hydraulic)│
  ├────────────────────────────────────────────────────────────────────────┤
  │ 3. INHERITANCE                                                         │
  │    Code reuse & hierarchical classification (Child extends Parent)     │
  │    Analogy: Child inherits genetic features & traits from parents      │
  ├────────────────────────────────────────────────────────────────────────┤
  │ 4. POLYMORPHISM                                                        │
  │    "Many forms": One interface/action, multiple behaviors              │
  │    Analogy: "sound()" -> Dog barks, Cat meows                          │
  └────────────────────────────────────────────────────────────────────────┘
        `,
        note: 'Throughout Days 2-5, we dive deeply into each pillar with visual code mechanics.',
      },
      diagramImage: {
        src: '/images/java_oop_four_pillars.jpg',
        alt: 'Four Pillars of Object-Oriented Programming (OOP) in Java Diagram',
        caption: 'Visual breakdown: 1. Encapsulation (data hiding & accessors), 2. Abstraction (simple dashboard hiding complex engine), 3. Inheritance (Vehicle -> Car & Truck hierarchy), 4. Polymorphism (shape.draw() dynamic forms).',
      },
      javaExample: `// Quick taste of Encapsulation: Protecting State
class BankAccount {
    private String accountNumber;
    private double balance; // Data hidden from external tamper

    public BankAccount(String accNo, double initialDeposit) {
        this.accountNumber = accNo;
        this.balance = initialDeposit;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount + " | New Balance: $" + balance);
        }
    }

    public double getBalance() {
        return balance;
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount("AC-10023", 500.0);
        acc.deposit(250.0);
        System.out.println("Verified Balance: $" + acc.getBalance());
        // acc.balance = -9999; // COMPILE ERROR! Direct tampering prevented!
    }
}`,
      expectedOutput: `Deposited: $250.0 | New Balance: $750.0
Verified Balance: $750.0`,
      teachingMode: {
        explain2Min: [
          'Encapsulation = Wrapping data (fields) & code (methods) together and restricting direct outside access via private keywords.',
          'Abstraction = Showing only what is necessary (interfaces, abstract classes) and hiding internal complexity.',
          'Inheritance = Establishing IS-A relationships (Dog is an Animal) to promote code reusability.',
          'Polymorphism = Ability of an object to take many forms (method overloading at compile-time & overriding at runtime).',
        ],
        drawTips: 'Draw 4 pillars supporting a classical building roof labeled "Robust Java Software Architecture".',
        codeHighlight: 'Point out how acc.balance = -9999; would corrupt data in procedural code, but Encapsulation stops it.',
        studentQuestion: 'Why is encapsulation better than just making all variables public?',
        studentAnswer: 'Public fields allow any external code to assign invalid, illegal, or corrupt data (e.g. negative bank balance, age = -500). Encapsulation guards data via validated methods.',
      },
      quizzes: [
        {
          id: 'q3-2',
          question: 'Which OOP pillar focuses on restricting direct access to object fields and exposing controlled methods?',
          options: ['Inheritance', 'Encapsulation', 'Polymorphism', 'Compilation'],
          correctAnswerIndex: 1,
          explanation: 'Encapsulation bundles data with accessor/mutator methods and marks fields private to enforce valid internal state.',
        },
      ],
    },
  ],
  miniChallenge: {
    id: 'ch-m3',
    moduleNumber: 3,
    title: 'Challenge 3: Encapsulated Bank Account',
    difficulty: 'Core OOP',
    problem:
      'Design a `BankAccount` class with:\n- private fields: `accountHolder` (String), `balance` (double)\n- A constructor `BankAccount(String holder, double openingBalance)`\n- Methods: `deposit(double amount)`, `withdraw(double amount)` (prevent overdraft!), and `displayStatement()`.',
    starterCode: `public class BankAccountApp {
    public static void main(String[] args) {
        // TODO: Instantiate and test BankAccount
    }
}

class BankAccount {
    // TODO: private fields, constructor, and methods
}
`,
    expectedOutput: `=== BANK STATEMENT ===
Holder: Ananya Patel
Balance: $1200.0
Withdrew: $400.0 | Remaining: $800.0
Withdrawal Rejected: Insufficient balance for $1000.0`,
    hints: [
      'Make fields private to protect against invalid mutations.',
      'In withdraw(), check if amount <= balance before subtracting.',
      'Print informative confirmation messages upon successful and rejected transactions.',
    ],
    solutionCode: `class BankAccount {
    private String accountHolder;
    private double balance;

    public BankAccount(String holder, double openingBalance) {
        this.accountHolder = holder;
        this.balance = openingBalance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public void withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
            System.out.println("Withdrew: $" + amount + " | Remaining: $" + balance);
        } else {
            System.out.println("Withdrawal Rejected: Insufficient balance for $" + amount);
        }
    }

    public void displayStatement() {
        System.out.println("=== BANK STATEMENT ===");
        System.out.println("Holder: " + accountHolder);
        System.out.println("Balance: $" + balance);
    }
}

public class BankAccountApp {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount("Ananya Patel", 1200.0);
        acc.displayStatement();
        acc.withdraw(400.0);
        acc.withdraw(1000.0);
    }
}`,
    explanation:
      'Demonstrates class structure, private field encapsulation, constructor initialization, method business logic validation, and clean object testing.',
  },
};
