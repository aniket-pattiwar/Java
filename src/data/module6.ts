import type { ModuleData } from '../types/course';

export const module6Data: ModuleData = {
  id: 6,
  title: 'Module 6: Abstraction, Interfaces & Object Class',
  subtitle: 'Day 5 (Part 1) · Abstract Classes, Multiple Interfaces, Object Contracts & the final Keyword',
  day: 5,
  estimatedHours: 4,
  description:
    'Design decoupled architectures using Abstract Classes and Interfaces. Master java.lang.Object methods (toString, equals, hashCode), enforce immutability with final, and introduce Functional Interfaces with Lambdas.',
  topicsCovered: [
    'Abstract Classes & Abstract Methods (abstract keyword)',
    'Interfaces & Multiple Interface Implementation (implements)',
    'Abstract Class vs Interface Comparison',
    'java.lang.Object Methods (toString, equals, hashCode)',
    'Object Identity (==) vs Logical Equality (.equals())',
    'The final Keyword (Variables, Methods, Classes)',
    'Functional Interfaces (@FunctionalInterface & Single Abstract Method)',
    'Introduction to Lambda Expressions (()->{})',
  ],
  concepts: [
    {
      id: 'm6-abstract-interface',
      title: 'Abstract Classes vs Interfaces',
      shortIdea: 'Abstract classes provide partial implementation (IS-A); Interfaces define 100% pure behavior contracts (CAN-DO) supporting multiple implementation.',
      moduleNumber: 6,
      dayNumber: 5,
      category: 'Abstraction',
      customVisualizer: 'abstract-interface',
      visualExplanation: {
        title: 'Multiple Interface Implementation & Class Hierarchy',
        diagramText: `
    <<interface>>             <<interface>>
     Printable                   Savable
         │                          │
         │ void print()             │ void save()
         │                          │
         └───────────┬──────────────┘
                     │ implements both
                     ▼
             ┌───────────────┐
             │    Report     │
             ├───────────────┤
             │ print() {...} │
             │ save()  {...} │
             └───────────────┘
        `,
        note: 'Java does not allow multiple class inheritance (extends A, B) to prevent the Diamond Problem, but allows implementing multiple interfaces (implements A, B).',
      },
      javaExample: `// 1. Multiple Interfaces
interface Printable {
    void print();
}

interface Savable {
    void save();
}

class FinancialReport implements Printable, Savable {
    private String title;

    FinancialReport(String title) {
        this.title = title;
    }

    @Override
    public void print() {
        System.out.println("Printing: " + title);
    }

    @Override
    public void save() {
        System.out.println("Saving: " + title + " to database.");
    }
}

public class Main {
    public static void main(String[] args) {
        FinancialReport r = new FinancialReport("Q1 2026 Audit");
        r.print();
        r.save();

        // Interface reference polymorphism
        Printable p = r;
        p.print();
    }
}`,
      expectedOutput: `Printing: Q1 2026 Audit
Saving: Q1 2026 Audit to database.
Printing: Q1 2026 Audit`,
      tryItCode: `abstract class Shape {
    abstract double area();
}

class Circle extends Shape {
    double radius;
    Circle(double r) { this.radius = r; }
    @Override
    double area() { return Math.PI * radius * radius; }
}

public class Main {
    public static void main(String[] args) {
        Shape s = new Circle(5.0);
        System.out.println("Circle Area: " + String.format("%.2f", s.area()));
    }
}`,
      teachingMode: {
        explain2Min: [
          'Abstract Class: Can have both abstract (unimplemented) and concrete (implemented) methods, instance variables, and constructors. Used for code reuse among closely related classes (IS-A).',
          'Interface: Pure contract of what a class CAN-DO. All fields are public static final by default. Methods are public abstract by default.',
          'Why multiple interfaces? Because an interface has no state/fields to cause ambiguity or diamond collisions.',
        ],
        drawTips:
          'Draw Shape <<abstract>> at top with dashed border for abstract area(). Draw Circle below with solid line implementing area(). Then draw two interface clouds plugging into a class.',
        codeHighlight: 'Emphasize that methods implementing interface contracts MUST be declared "public".',
        studentQuestion: 'Can we create an object of an abstract class using "new AbstractClass()"?',
        studentAnswer: 'No! Abstract classes cannot be directly instantiated with "new" because they may contain incomplete abstract methods with no body. You must instantiate a concrete subclass.',
      },
      quizzes: [
        {
          id: 'q6-1',
          question: 'Can a single Java class implement multiple interfaces?',
          options: [
            'No, Java only allows implementing one interface',
            'Yes, a class can implement any number of interfaces separated by commas',
            'Only if the class is marked abstract',
            'Only if all interfaces have the same method names',
          ],
          correctAnswerIndex: 1,
          explanation: 'Java supports multiple inheritance of type through interfaces (e.g., class Report implements Printable, Savable).',
        },
      ],
    },
    {
      id: 'm6-object-class',
      title: 'The Object Class: toString(), equals(), hashCode()',
      shortIdea: 'java.lang.Object is the root parent of all Java classes. Overriding its core methods provides meaningful printing and logical equality.',
      moduleNumber: 6,
      dayNumber: 5,
      category: 'Object Contracts',
      customVisualizer: 'object-class',
      visualExplanation: {
        title: 'Default vs Overridden Object Behavior',
        diagramText: `
 1. toString() Comparison:
    Default:    Student@5e2de80c (Class Name + Hex HashCode)
    Overridden: Student{id=101, name='Rahul'} (Human-readable text!)

 2. Object Equality: == vs .equals():
    s1 == s2       ──► Checks REFERENCE IDENTITY (same heap memory address?)
    s1.equals(s2)  ──► Checks LOGICAL VALUE EQUALITY (same student ID/data?)

 3. hashCode() Contract:
    If a.equals(b) is TRUE  ──► a.hashCode() MUST EQUAL b.hashCode()!
        `,
        note: 'When using HashMaps or HashSets, failing to override hashCode() alongside equals() breaks lookup keys!',
      },
      diagramImage: {
        src: '/images/java_object_equals_hashcode_contract.jpg',
        alt: 'Java Object Class equals() and hashCode() Contract Diagram',
        caption: 'Object Contract: 1. Reference Equality (== compares memory address), 2. Logical Equality (.equals() compares field state), 3. HashCode Contract (equal objects must produce the same hash bucket index).',
      },
      javaExample: `class Student {
    private int id;
    private String name;

    Student(int id, String name) {
        this.id = id;
        this.name = name;
    }

    // 1. Human-readable string representation
    @Override
    public String toString() {
        return "Student{id=" + id + ", name='" + name + "'}";
    }

    // 2. Logical Equality check
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true; // same memory address
        if (obj == null || getClass() != obj.getClass()) return false;
        Student other = (Student) obj;
        return this.id == other.id;
    }

    // 3. Matching HashCode Contract
    @Override
    public int hashCode() {
        return Integer.hashCode(id);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student(101, "Rahul");
        Student s2 = new Student(101, "Rahul");

        System.out.println("Printing s1: " + s1);
        System.out.println("Reference equality (s1 == s2): " + (s1 == s2));
        System.out.println("Logical equality (s1.equals(s2)): " + s1.equals(s2));
    }
}`,
      expectedOutput: `Printing s1: Student{id=101, name='Rahul'}
Reference equality (s1 == s2): false
Logical equality (s1.equals(s2)): true`,
      teachingMode: {
        explain2Min: [
          'Every class in Java automatically extends java.lang.Object if no other superclass is specified.',
          'System.out.println(obj) automatically calls obj.toString(). Without overriding, you get ugly ClassName@Hashcode.',
          '== checks if both pointers hold the EXACT same memory address in heap.',
          '.equals() checks if two distinct objects represent the same data logically.',
          'Contract: If a.equals(b) is true, their hashCode() MUST be equal.',
        ],
        drawTips:
          'Draw two distinct boxes in Heap with id=101. Show == pointing to two different boxes (false), while equals() compares inside data (true).',
        codeHighlight: 'Highlight the getClass() check and cast in equals() to show standard robust implementation.',
        studentQuestion: 'What does String s1 = new String("Hello"); String s2 = new String("Hello"); s1 == s2 vs s1.equals(s2) return?',
        studentAnswer: 's1 == s2 returns false because "new" created two separate heap objects. s1.equals(s2) returns true because String overrides .equals() to compare characters.',
      },
      quizzes: [
        {
          id: 'q6-2',
          question: 'What is the contract between equals() and hashCode() in Java?',
          options: [
            'If two objects have the same hashCode, they must be equals()',
            'If two objects are equals(), their hashCode() MUST be identical',
            'hashCode() is only needed for primitive types',
            'equals() and hashCode() are completely independent',
          ],
          correctAnswerIndex: 1,
          explanation: 'The Java Object specification states that if two objects are equal according to equals(), calling hashCode() on each must produce the same integer result.',
        },
      ],
    },
    {
      id: 'm6-final-functional',
      title: 'The final Keyword & Functional Interfaces',
      shortIdea: 'final locks variables, methods, and classes; Functional Interfaces contain exactly one abstract method for lambda expressions.',
      moduleNumber: 6,
      dayNumber: 5,
      category: 'Language Rules',
      customVisualizer: 'final-keyword-grid',
      visualExplanation: {
        title: 'The 3 Scopes of final & Functional Lambda Syntax',
        diagramText: `
 1. final variable ──► Value is CONSTANT (cannot be reassigned)
    final double PI = 3.14159;

 2. final method   ──► Method CANNOT be overridden by subclasses
    final void securityCheck() {...}

 3. final class    ──► Class CANNOT be extended / subclassed
    final class String {...}

 ────────────────────────────────────────────────────────────────
 Functional Interface (SAM = Single Abstract Method)
 @FunctionalInterface
 interface Greeter { void greet(String name); }
         │
         ▼  Lambda Expression
 Greeter g = (name) -> System.out.println("Hello, " + name);
        `,
        note: 'The @FunctionalInterface annotation informs the compiler to enforce the single-abstract-method rule.',
      },
      javaExample: `// 1. Functional Interface definition
@FunctionalInterface
interface MathOperation {
    int operate(int a, int b);
}

public class FinalAndLambdaDemo {
    public static void main(String[] args) {
        // 2. Lambda expression implementations
        MathOperation add = (a, b) -> a + b;
        MathOperation multiply = (a, b) -> a * b;

        System.out.println("Addition: " + add.operate(10, 5));
        System.out.println("Multiplication: " + multiply.operate(10, 5));

        // 3. Final variable demonstration
        final int MAX_USERS = 500;
        // MAX_USERS = 600; // COMPILE ERROR: Cannot assign a value to final variable!
        System.out.println("System Max Users: " + MAX_USERS);
    }
}`,
      expectedOutput: `Addition: 15
Multiplication: 50
System Max Users: 500`,
      teachingMode: {
        explain2Min: [
          'final keyword = IMMUTABILITY / NO EXTENSION.',
          'final variable: constant value.',
          'final method: prevents children from tampering with core algorithm (security/optimization).',
          'final class: cannot be extended (e.g. String is final for security and caching).',
          'Functional Interface: An interface with EXACTLY ONE abstract method. Can be cleanly written as a Lambda (params) -> body.',
        ],
        drawTips: 'Draw a lock icon next to 3 targets: 1. variable box 2. method header 3. class definition.',
        codeHighlight: 'Show how concise (a, b) -> a + b is compared to creating an entire anonymous inner class.',
        studentQuestion: 'Why is the String class in Java marked as "final"?',
        studentAnswer: 'For security, immutability, thread-safety, and String Pool optimization. If String were non-final, someone could subclass it and alter string behavior (e.g. bypass password/URL checks).',
      },
      quizzes: [
        {
          id: 'q6-3',
          question: 'What is a Functional Interface in Java?',
          options: [
            'An interface with no methods at all',
            'An interface containing exactly one abstract method',
            'An interface that only contains static methods',
            'An interface that cannot be implemented',
          ],
          correctAnswerIndex: 1,
          explanation: 'A functional interface is any interface with a Single Abstract Method (SAM), allowing it to be implemented via lambda expressions.',
        },
      ],
    },
  ],
  miniChallenge: {
    id: 'ch-m6',
    moduleNumber: 6,
    title: 'Challenge 6: Shape Abstraction & Comparable Contract',
    difficulty: 'Core OOP',
    problem:
      'Create an abstract class `Shape` with an abstract method `double getArea()`. Implement `Rectangle` (length, width) and override `toString()`, `equals()`, and `getArea()`. Compare two rectangles for equality based on equal dimensions.',
    starterCode: `abstract class Shape {
    abstract double getArea();
}

// TODO: Implement Rectangle with toString and equals

public class ShapeApp {
    public static void main(String[] args) {
        // TODO: Test Shape polymorphism and logical equality
    }
}`,
    expectedOutput: `Rectangle 1: Rectangle[5.0 x 4.0, Area=20.0]
Rectangle 2: Rectangle[5.0 x 4.0, Area=20.0]
Are rectangles logically equal? true
Are rectangles the same object (==)? false`,
    hints: [
      'Implement getArea() as length * width in Rectangle.',
      'In equals(), check if this == obj, then check length == other.length and width == other.width.',
    ],
    solutionCode: `abstract class Shape {
    abstract double getArea();
}

class Rectangle extends Shape {
    private double length;
    private double width;

    Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }

    @Override
    double getArea() {
        return length * width;
    }

    @Override
    public String toString() {
        return "Rectangle[" + length + " x " + width + ", Area=" + getArea() + "]";
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Rectangle other = (Rectangle) obj;
        return Double.compare(this.length, other.length) == 0 &&
               Double.compare(this.width, other.width) == 0;
    }

    @Override
    public int hashCode() {
        return Double.hashCode(length) * 31 + Double.hashCode(width);
    }
}

public class ShapeApp {
    public static void main(String[] args) {
        Shape r1 = new Rectangle(5.0, 4.0);
        Shape r2 = new Rectangle(5.0, 4.0);

        System.out.println("Rectangle 1: " + r1);
        System.out.println("Rectangle 2: " + r2);
        System.out.println("Are rectangles logically equal? " + r1.equals(r2));
        System.out.println("Are rectangles the same object (==)? " + (r1 == r2));
    }
}`,
    explanation:
      'Demonstrates abstract method implementation, polymorphic references, complete Object method contracts (toString, equals, hashCode), and comparison precision.',
  },
};
