import type { ModuleData } from '../types/course';

export const module5Data: ModuleData = {
  id: 5,
  title: 'Module 5: Inheritance, Polymorphism & Casting',
  subtitle: 'Day 4 · Inheritance Trees, Dynamic Method Dispatch, Casting & OOP Relationships',
  day: 4,
  estimatedHours: 4,
  description:
    'Master core OOP relationships: Single/Multilevel inheritance, Association vs Aggregation vs Composition, Method Overloading (compile-time) vs Overriding (runtime), this and super, and safe reference casting.',
  topicsCovered: [
    'Inheritance Hierarchy (extends keyword, code reuse)',
    'Association vs Aggregation vs Composition (Relationship Strength & Lifecycle)',
    'Compile-time Polymorphism (Method Overloading)',
    'Runtime Polymorphism (Method Overriding & Dynamic Method Dispatch)',
    'this vs super Keywords (Resolving Shadowing & Calling Parent)',
    'Reference Assignment Compatibility (Parent ref = new Child())',
    'Upcasting (Safe, Implicit) vs Downcasting (Explicit & ClassCastException risk)',
    'instanceof Operator for Safe Casting',
  ],
  concepts: [
    {
      id: 'm5-polymorphism-dispatch',
      title: 'Compile-Time vs Runtime Polymorphism',
      shortIdea: 'Overloading is resolved at compile time by argument list; Overriding is resolved at runtime by the actual heap object.',
      moduleNumber: 5,
      dayNumber: 4,
      category: 'Polymorphism',
      customVisualizer: 'polymorphism',
      visualExplanation: {
        title: 'Dynamic Method Dispatch in Action',
        diagramText: `
 1. Compile-Time: Compiler inspects REFERENCE TYPE
    Animal a = new Dog();
    Compiler checks: "Does class Animal have sound()?" ──► YES (Compile OK!)

 2. Runtime: JVM inspects ACTUAL HEAP OBJECT
    a.sound();
    Reference: [ Animal a ] ─── points to ───► [ Heap: Dog Object ]
                                                   │
                                            Executes Dog's sound()!
                                            Output: "Dog barks: Woof!"
        `,
        note: 'The Reference Type determines WHAT methods you can call at compile time. The Actual Object determines WHICH implementation runs at runtime!',
      },
      javaExample: `class Animal {
    void sound() {
        System.out.println("Animal makes a generic sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Dog barks: Woof Woof!");
    }

    void fetch() {
        System.out.println("Dog is fetching the ball!");
    }
}

class Cat extends Animal {
    @Override
    void sound() {
        System.out.println("Cat meows: Meow Meow!");
    }
}

public class Main {
    public static void main(String[] args) {
        // Runtime Polymorphism: Parent reference -> Child object
        Animal myAnimal1 = new Dog();
        Animal myAnimal2 = new Cat();

        myAnimal1.sound(); // Dispatches Dog.sound()
        myAnimal2.sound(); // Dispatches Cat.sound()

        // myAnimal1.fetch(); // COMPILE ERROR! Animal reference cannot see fetch()
    }
}`,
      expectedOutput: `Dog barks: Woof Woof!
Cat meows: Meow Meow!`,
      tryItCode: `class Calculator {
    // Compile-time Polymorphism (Overloading)
    int add(int a, int b) { return a + b; }
    int add(int a, int b, int c) { return a + b + c; }
    double add(double a, double b) { return a + b; }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println("2 ints: " + calc.add(10, 20));
        System.out.println("3 ints: " + calc.add(10, 20, 30));
        System.out.println("2 doubles: " + calc.add(5.5, 4.5));
    }
}`,
      teachingMode: {
        explain2Min: [
          'Overloading (Compile-Time / Early Binding): Same method name, different parameter signature in the SAME class. Resolved by compiler.',
          'Overriding (Runtime / Dynamic Method Dispatch): Subclass provides a specific implementation of a method already in parent class with exact same signature.',
          'Golden Rule of Polymorphism: Left side (Reference Type) defines method validity during compilation. Right side (Actual Object) dictates method execution at runtime.',
        ],
        drawTips:
          'Draw Animal box with sound(). Draw Dog box inheriting Animal with overridden sound(). Draw pointer from Animal a = new Dog(). Circle Dog object and draw spark at Dog.sound().',
        codeHighlight: 'Explain why myAnimal1.fetch() fails to compile even though the object is a Dog: Compiler only inspects the Animal reference.',
        studentQuestion: 'If Parent p = new Child(); and both Parent and Child define a public int value = 10 and 20 respectively, what will p.value return?',
        studentAnswer: 'p.value returns 10! Variables in Java are NOT polymorphic (they are resolved at compile-time by reference type). Only instance methods participate in runtime polymorphism.',
      },
      quizzes: [
        {
          id: 'q5-1',
          question: 'In the code: Animal a = new Dog(); a.sound(); which implementation of sound() executes at runtime?',
          options: [
            'Animal\'s sound() method',
            'Dog\'s sound() method',
            'Both methods in sequence',
            'Neither, it causes a compilation error',
          ],
          correctAnswerIndex: 1,
          explanation: 'Java uses Dynamic Method Dispatch: the runtime object in Heap (Dog) determines which overridden method executes.',
        },
        {
          id: 'q5-2',
          question: 'Can method overloading be achieved simply by changing the return type of a method?',
          options: [
            'Yes, return type distinguishes overloaded methods',
            'No, parameter list (type, number, or order) MUST differ for overloading',
            'Yes, but only if the method is marked static',
            'Only in Java 17+',
          ],
          correctAnswerIndex: 1,
          explanation: 'Return type alone cannot distinguish overloaded methods because the compiler cannot determine which method the caller intended to invoke.',
        },
      ],
    },
    {
      id: 'm5-casting-rules',
      title: 'Reference Casting: Upcasting vs Downcasting',
      shortIdea: 'Upcasting (Child -> Parent) is safe and automatic; Downcasting (Parent -> Child) requires explicit cast and carries ClassCastException risk.',
      moduleNumber: 5,
      dayNumber: 4,
      category: 'Type System',
      customVisualizer: 'casting-diagram',
      visualExplanation: {
        title: 'Casting Hierarchy & Safety Warning',
        diagramText: `
              [ Animal ]  ▲
                  │       │  UPCASTING (Implicit, 100% Safe)
                  │       │  Dog -> Animal
                  ▼       │
               [ Dog ]    │
                  │       │
                  │       ▼  DOWNCASTING (Explicit, Risky!)
                  │          Animal -> Dog
                  ▼          Requires: (Dog) animalRef
         [ ClassCastException! ]
         (If the actual heap object is NOT a Dog!)
        `,
        note: 'Always guard downcasting with instanceof check: if (animal instanceof Dog dog) { dog.fetch(); }',
      },
      diagramImage: {
        src: '/images/java_inheritance_super_casting.jpg',
        alt: 'Java Inheritance Hierarchy and Reference Casting Rules Diagram',
        caption: 'Visual hierarchy: Parent Person -> Subclass Student with super(name, id). Upcasting (Person p = new Student()) is implicit and safe. Downcasting requires explicit cast and instanceof guard.',
      },
      javaExample: `class Animal {
    void eat() { System.out.println("Animal is eating"); }
}

class Dog extends Animal {
    void bark() { System.out.println("Woof Woof!"); }
}

class Cat extends Animal {
    void purr() { System.out.println("Purr Purr!"); }
}

public class CastingDemo {
    public static void main(String[] args) {
        // 1. UPCASTING (Implicit, always safe)
        Animal myAnimal = new Dog(); // Dog IS-A Animal
        myAnimal.eat();

        // 2. DOWNCASTING (Explicit with safety check)
        if (myAnimal instanceof Dog) {
            Dog myDog = (Dog) myAnimal; // Safe downcast
            myDog.bark();
        }

        // 3. UNSAFE DOWNCAST HAZARD:
        Animal catRef = new Cat();
        try {
            Dog badDog = (Dog) catRef; // RUNTIME CRASH: ClassCastException!
            badDog.bark();
        } catch (ClassCastException e) {
            System.out.println("Caught Expected Error: Cat cannot be cast to Dog!");
        }
    }
}`,
      expectedOutput: `Animal is eating
Woof Woof!
Caught Expected Error: Cat cannot be cast to Dog!`,
      teachingMode: {
        explain2Min: [
          'Upcasting: Moving UP the inheritance tree. Generalizing specific child to parent (Dog -> Animal). Always safe, done implicitly by compiler.',
          'Downcasting: Moving DOWN the inheritance tree. Narrowing general parent back to specific child (Animal -> Dog). Risky because parent reference might actually point to a Cat or generic Animal.',
          'Always use "instanceof" before downcasting to avoid ClassCastException at runtime.',
        ],
        drawTips:
          'Draw an elevator: Going UP to penthouse (Upcasting) is wide open. Going DOWN to basement (Downcasting) has a security guard checkpoint labeled "instanceof".',
        codeHighlight: 'Show the try-catch block intercepting ClassCastException to make the hazard visceral to students.',
        studentQuestion: 'Why does the compiler allow Dog badDog = (Dog) catRef; to compile even though it crashes at runtime?',
        studentAnswer: 'Because catRef is declared as type Animal, and Dog is a valid subclass of Animal, so it is syntactically possible. The compiler cannot know what actual object is stored in the heap at that memory address until runtime.',
      },
      quizzes: [
        {
          id: 'q5-3',
          question: 'What runtime exception occurs if you attempt an illegal downcast in Java?',
          options: ['NullPointerException', 'ClassCastException', 'IllegalArgumentException', 'NoSuchMethodException'],
          correctAnswerIndex: 1,
          explanation: 'Attempting to cast an object to a subclass of which it is not an instance throws java.lang.ClassCastException.',
        },
      ],
    },
    {
      id: 'm5-relationships',
      title: 'Association vs Aggregation vs Composition',
      shortIdea: 'Association is a peer relationship; Aggregation is weak containment (has-a); Composition is strong containment (part-of).',
      moduleNumber: 5,
      dayNumber: 4,
      category: 'OOP Relationships',
      customVisualizer: 'relationship',
      visualExplanation: {
        title: 'Relationship Strength & Lifecycle Dependency',
        diagramText: `
 1. ASSOCIATION (Weakest - "Uses a" / "Knows a")
    Teacher ──────────────────── Student
    (Independent lifecycles: Teacher exists without Student and vice versa)

 2. AGGREGATION (Medium - "Has a" / Weak Ownership)
    Department ◇──────────────── Teacher
    (If Department closes, Teacher still exists independently)

 3. COMPOSITION (Strongest - "Part of" / Strict Ownership)
    House ◆───────────────────── Room
    (If House is destroyed, the Rooms are destroyed with it!)
        `,
        note: 'UML Notation: Association = simple line, Aggregation = hollow diamond (◇), Composition = filled diamond (◆).',
      },
      diagramImage: {
        src: '/images/java_uml_relationships_composition.jpg',
        alt: 'UML Relationships in Java: Association, Aggregation, and Composition',
        caption: 'UML Lifecycle Breakdown: 1. Association (Doctor & Patient - loose coupling), 2. Aggregation (Department & Professor - part can survive whole), 3. Composition (House & Room - high dependency, death of whole destroys part).',
      },
      javaExample: `// 1. Composition: Room cannot exist without House
class Room {
    String name;
    Room(String name) { this.name = name; }
}

class House {
    private Room livingRoom; // House owns and controls Room lifecycle

    House() {
        this.livingRoom = new Room("Master Living Room"); // Instantiated inside!
    }

    void describe() {
        System.out.println("House with: " + livingRoom.name);
    }
}

// 2. Aggregation: Department has Teacher (Independent lifecycles)
class Teacher {
    String name;
    Teacher(String name) { this.name = name; }
}

class Department {
    String deptName;
    Teacher teacher; // Passed in from outside

    Department(String deptName, Teacher teacher) {
        this.deptName = deptName;
        this.teacher = teacher;
    }
}

public class Main {
    public static void main(String[] args) {
        // Composition Demo
        House myHouse = new House();
        myHouse.describe();

        // Aggregation Demo
        Teacher prof = new Teacher("Dr. Sharma");
        Department csDept = new Department("Computer Science", prof);
        System.out.println(prof.name + " works in " + csDept.deptName);
    }
}`,
      expectedOutput: `House with: Master Living Room
Dr. Sharma works in Computer Science`,
      teachingMode: {
        explain2Min: [
          'Association: Peer relationship. "Teacher teaches Student".',
          'Aggregation (HAS-A): Whole-part relationship where parts survive without the whole. "Department has Professors" (if department dissolves, professors remain).',
          'Composition (PART-OF): Strict whole-part relationship where parts die with the whole. "Human has Heart" or "House has Rooms" (if human dies, heart dies).',
        ],
        drawTips:
          'Draw the 3 UML symbols: 1. Plain line (Association) 2. Open diamond ◇ (Aggregation) 3. Filled diamond ◆ (Composition).',
        codeHighlight: 'Notice in Composition, Room is created INSIDE House constructor. In Aggregation, Teacher is passed into Department.',
        studentQuestion: 'In an e-commerce system, is the relationship between Order and OrderItem composition or aggregation?',
        studentAnswer: 'Composition! An OrderItem cannot exist independently without its parent Order. If the Order is deleted, all its individual line items are deleted with it.',
      },
      quizzes: [
        {
          id: 'q5-4',
          question: 'Which relationship represents the strongest bond where child objects cannot exist without the parent?',
          options: ['Association', 'Aggregation', 'Composition', 'Generalization'],
          correctAnswerIndex: 2,
          explanation: 'Composition is the strongest form of aggregation where the child lifecycle is strictly bound to and managed by the parent.',
        },
      ],
    },
  ],
  miniChallenge: {
    id: 'ch-m5',
    moduleNumber: 5,
    title: 'Challenge 5: Payroll Polymorphism System',
    difficulty: 'Core OOP',
    problem:
      'Create a base class `Employee` with `name` and `calculatePay()`. Derive `FullTimeEmployee` (fixed monthly salary) and `Contractor` (hourly rate * hours worked). Store them in an `Employee[]` array and calculate total company payout polymorphically.',
    starterCode: `class Employee {
    String name;
    Employee(String name) { this.name = name; }
    // TODO: calculatePay()
}

// TODO: FullTimeEmployee and Contractor subclasses

public class PayrollApp {
    public static void main(String[] args) {
        // TODO: Create array of Employees and compute total payout polymorphically
    }
}`,
    expectedOutput: `Employee: Rajesh (Full-Time) | Pay: $5000.0
Employee: Kavita (Contractor) | Pay: $3600.0
=== TOTAL COMPANY PAYOUT: $8600.0 ===`,
    hints: [
      'Override calculatePay() in both FullTimeEmployee and Contractor.',
      'Loop over Employee[] array using enhanced for-each and call emp.calculatePay().',
    ],
    solutionCode: `class Employee {
    String name;

    Employee(String name) {
        this.name = name;
    }

    double calculatePay() {
        return 0.0;
    }
}

class FullTimeEmployee extends Employee {
    private double monthlySalary;

    FullTimeEmployee(String name, double salary) {
        super(name);
        this.monthlySalary = salary;
    }

    @Override
    double calculatePay() {
        return monthlySalary;
    }
}

class Contractor extends Employee {
    private double hourlyRate;
    private int hoursWorked;

    Contractor(String name, double rate, int hours) {
        super(name);
        this.hourlyRate = rate;
        this.hoursWorked = hours;
    }

    @Override
    double calculatePay() {
        return hourlyRate * hoursWorked;
    }
}

public class PayrollApp {
    public static void main(String[] args) {
        Employee[] team = {
            new FullTimeEmployee("Rajesh", 5000.0),
            new Contractor("Kavita", 45.0, 80)
        };

        double totalPayout = 0;
        for (Employee emp : team) {
            double pay = emp.calculatePay();
            totalPayout += pay;
            String type = (emp instanceof FullTimeEmployee) ? "(Full-Time)" : "(Contractor)";
            System.out.println("Employee: " + emp.name + " " + type + " | Pay: $" + pay);
        }

        System.out.println("=== TOTAL COMPANY PAYOUT: $" + totalPayout + " ===");
    }
}`,
    explanation:
      'Demonstrates base class inheritance, super constructor invocation, method overriding, and polymorphic collection processing.',
  },
};
