import type { ModuleData } from '../types/course';

export const module4Data: ModuleData = {
  id: 4,
  title: 'Module 4: Constructors & Reference Variables',
  subtitle: 'Day 3 · Object Construction, Stack vs Heap Memory, Pass-by-Value Mechanics',
  day: 3,
  estimatedHours: 4,
  description:
    'Deep dive into memory mechanics: How constructors initialize heap objects, how reference variables in the stack point to heap instances, reference sharing (s2 = s1), reassignment, and pass-by-value proof.',
  topicsCovered: [
    'Constructors (Default vs Parameterized & Overloading)',
    'Constructor Rules (No return type, same name as class)',
    'Stack Memory vs Heap Memory Architecture',
    'Reference Variables as Stack Pointers',
    'Reference Assignment (s2 = s1 pointing to the SAME object)',
    'Reassigning References & Orphan Objects (Garbage Collection)',
    'Java is Strictly Pass-by-Value (Primitives vs References)',
    'Null References & NullPointerException Prevention',
  ],
  concepts: [
    {
      id: 'm4-stack-heap',
      title: 'Stack vs Heap Memory Architecture',
      shortIdea: 'Stack stores local primitives and reference variables; Heap stores all dynamic objects and instance data.',
      moduleNumber: 4,
      dayNumber: 3,
      category: 'Memory Management',
      customVisualizer: 'stack-heap',
      visualExplanation: {
        title: 'Stack vs Heap Runtime Memory Layout',
        diagramText: `
  STACK MEMORY                            HEAP MEMORY
 ┌───────────────────────────┐           ┌─────────────────────────────┐
 │ main() Frame              │           │                             │
 │   int count = 10;         │           │  Student Object (@0x3A21)   │
 │                           │           │  ┌────────────────────────┐ │
 │   Student s1 ─────────────┼───────────┼─►│ name = "Rahul"         │ │
 │       (@0x3A21)           │           │  │ age  = 20              │ │
 │                           │           │  └────────────────────────┘ │
 │   Student s2 ─────────────┼───────────┘                             │
 │       (@0x3A21)           │ (Both s1 and s2 point to SAME object!)  │
 └───────────────────────────┘           └─────────────────────────────┘
        `,
        note: 'When s2 = s1 executes, the reference memory address in the stack is copied. No new object is created in the heap.',
      },
      diagramImage: {
        src: '/images/java_stack_vs_heap_memory.jpg',
        alt: 'Java Memory Architecture: Stack Memory vs Heap Memory Diagram',
        title: 'Stack Memory vs Heap Memory Architecture',
        caption: 'Stack vs Heap layout: Stack holds method call frames (LIFO) with local primitive variables and reference variables (s1 and s2 holding address @0x3A21). Heap holds dynamic objects (Student Object with name="Rahul", age=20). Reference assignment s2 = s1 copies the address pointer, so both point to the same shared Heap instance.',
      },
      javaExample: `class Student {
    String name;
    int age;

    Student(String n, int a) {
        name = n;
        age = a;
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Rahul", 20);
        Student s2 = s1; // Copies reference address

        s2.age = 22; // Modifying object via s2

        // Both s1 and s2 observe age = 22!
        System.out.println("s1.age: " + s1.age);
        System.out.println("s2.age: " + s2.age);

        s2 = new Student("Priya", 24); // s2 now points to a NEW heap object
        System.out.println("After reassignment:");
        System.out.println("s1.name: " + s1.name + ", age: " + s1.age);
        System.out.println("s2.name: " + s2.name + ", age: " + s2.age);
    }
}`,
      expectedOutput: `s1.age: 22
s2.age: 22
After reassignment:
s1.name: Rahul, age: 22
s2.name: Priya, age: 24`,
      tryItCode: `class Box {
    int weight;
    Box(int w) { this.weight = w; }
}

public class Main {
    public static void main(String[] args) {
        Box b1 = new Box(50);
        Box b2 = b1;
        b2.weight = 99;
        System.out.println("b1 weight: " + b1.weight);
    }
}`,
      teachingMode: {
        explain2Min: [
          'Stack: Fast, organized in LIFO method call frames. Holds local primitive variables and reference pointer addresses.',
          'Heap: Large, dynamic global memory area where all objects (instances) and their instance fields live.',
          'Crucial Rule: Variable "s" does NOT contain the object; it contains the memory address of the object in the Heap.',
          'When s2 = s1 is executed: no second object is made. Two remote controls now control the exact same television!',
        ],
        drawTips:
          'Draw two large columns on whiteboard: Left column = STACK, Right column = HEAP. Draw arrow from s1 in Stack to a bubble in Heap. Then draw s2 pointing to that same bubble. Cross out arrow for s2 when reassigned.',
        codeHighlight: 'Emphasize that s2.age = 22 modifies the shared Heap instance that s1 also references.',
        studentQuestion: 'If Student s1 = new Student("Amit"); Student s2 = s1; s1 = null; can we still access the student via s2?',
        studentAnswer: 'Yes! Setting s1 = null only clears s1\'s stack pointer. s2 still holds the valid heap memory address pointing to the Student object, so it is NOT garbage collected.',
      },
      quizzes: [
        {
          id: 'q4-1',
          question: 'Where is an object\'s instance data stored in Java at runtime?',
          options: ['In the Stack frame', 'In the Heap memory', 'In the CPU Registers', 'Inside the javac compiler'],
          correctAnswerIndex: 1,
          explanation: 'All Java objects and their instance variables are allocated in the Heap. The Stack only holds reference pointer variables and method frames.',
        },
        {
          id: 'q4-2',
          question: 'What happens after executing: Student s1 = new Student(); Student s2 = s1; ?',
          options: [
            'Two separate Student objects are created in the Heap',
            'One Student object is created in the Heap, and both s1 and s2 hold references to it',
            'A compilation error occurs because references cannot be assigned',
            's1 becomes null',
          ],
          correctAnswerIndex: 1,
          explanation: 'Only one object is created with "new". s2 gets a copy of the reference address held by s1.',
        },
      ],
    },
    {
      id: 'm4-pass-by-value',
      title: 'Java is Strictly Pass-by-Value',
      shortIdea: 'Java always passes copies of values: for primitives, a copy of data; for objects, a copy of the reference address.',
      moduleNumber: 4,
      dayNumber: 3,
      category: 'Language Mechanics',
      visualExplanation: {
        title: 'Pass-by-Value Mechanics: Mutating State vs Reassigning Reference',
        diagramText: `
 1. Mutating through Reference Copy:
    Caller Frame [ s: @0x100 ] ──► Heap [ Student: name = "Rahul" ]
          │ (copies pointer)               ▲
    Method Frame [ s: @0x100 ] ────────────┘ (Modifying s.name changes Heap object!)

 2. Reassigning Reference Copy:
    Caller Frame [ s: @0x100 ] ──► Heap [ Student: "Rahul" ] (UNTOUCHED!)
          │ (copies pointer)
    Method Frame [ s: @0x200 ] ──► Heap [ Student: "Priya" ] (Local copy repointed!)
        `,
        note: 'Inside a method, reassigning param = new Student() will NEVER change the caller\'s reference outside the method!',
      },
      diagramImages: [
        {
          src: '/images/java_pass_by_value_references.jpg',
          alt: 'Java is Strictly Pass-by-Value: Primitive vs Object Reference Passing Diagram',
          title: 'Java Pass-by-Value & Reference Passing Mechanics',
          caption: 'Three key rules: 1) Primitive passing copies raw bits (original x stays 10). 2) Object reference passing copies the pointer address (@0x100), so modifying s.name changes the shared heap object. 3) Reassigning the parameter s = new Student() only updates the local frame pointer (@0x200), leaving the caller original reference s1 completely untouched!',
        },
        {
          src: '/images/java_pass_by_value_diagram.jpg',
          alt: 'Java Pass-by-Value Stack Frame & Heap Lifecycle Diagram',
          title: 'Stack Frames & Heap Reference Mutation Lifecycle',
          caption: 'Stack & Heap trace: Primitives pass a copy of data (x = 10 -> 20 leaves original unchanged); Object references pass a copy of the pointer address (@0x3A21), mutating fields updates the shared heap object.',
        },
      ],
      javaExample: `class Student {
    String name;
    Student(String n) { this.name = n; }
}

public class PassByValueDemo {
    // 1. Modifying Object State via copied reference
    static void modifyName(Student s) {
        s.name = "Vikram (Updated)";
    }

    // 2. Attempting to Reassign the reference
    static void reassignStudent(Student s) {
        s = new Student("Brand New Object"); // Only repoints local parameter s!
    }

    public static void main(String[] args) {
        Student original = new Student("Rahul");
        System.out.println("Initial Name: " + original.name);

        modifyName(original);
        System.out.println("After modifyName(): " + original.name);

        reassignStudent(original);
        System.out.println("After reassignStudent(): " + original.name); // Still Vikram!
    }
}`,
      expectedOutput: `Initial Name: Rahul
After modifyName(): Vikram (Updated)
After reassignStudent(): Vikram (Updated)`,
      teachingMode: {
        explain2Min: [
          'Most common interview confusion: Is Java pass-by-reference? NO! Java is ALWAYS Pass-by-Value.',
          'When passing a primitive (int x = 5), a copy of the number 5 is passed. Changes inside method don\'t affect caller.',
          'When passing an object reference (Student s), a COPY of the reference address (@0x100) is passed.',
          'Because both addresses point to the same Heap object, mutating s.name affects the object. But repointing s = new Student() only modifies the local parameter copy!',
        ],
        drawTips:
          'Draw the caller stack frame with "original: @100". When calling reassignStudent, draw a new stack frame with parameter "s: @100". Show s being changed to @200 inside its own frame, leaving "original" pointing to @100.',
        codeHighlight: 'Show why reassignStudent() did NOT change original.name to "Brand New Object".',
        studentQuestion: 'Why does reassignStudent(original) fail to change what original points to in main()?',
        studentAnswer: 'Because Java passes references BY VALUE (a copy of the memory address). The method parameter receives a copy of the pointer. Reassigning it only changes the local copy, leaving the original variable in main() intact.',
      },
      quizzes: [
        {
          id: 'q4-3',
          question: 'Does Java support pass-by-reference for objects?',
          options: [
            'Yes, all objects are pass-by-reference',
            'No, Java is strictly pass-by-value for both primitives and object references',
            'Yes, but only for arrays',
            'It depends on whether the class is public or private',
          ],
          correctAnswerIndex: 1,
          explanation: 'Java is strictly Pass-by-Value. When passing an object, Java passes a copy of the reference value (the memory address).',
        },
      ],
    },
  ],
  miniChallenge: {
    id: 'ch-m4',
    moduleNumber: 4,
    title: 'Challenge 4: Stack vs Heap Reference Tracer',
    difficulty: 'Core OOP',
    problem:
      'Predict and verify the memory state by creating a `Product` class with `name` and `price`. Construct two products, share the reference (`p2 = p1`), update `p2.price`, then repoint `p2 = new Product(...)` and print both objects.',
    starterCode: `class Product {
    String name;
    double price;

    // TODO: Constructor and printDetails method
}

public class ProductTracer {
    public static void main(String[] args) {
        // TODO: Trace reference sharing and reassignment
    }
}`,
    expectedOutput: `Product 1: Laptop | Price: $1200.0
Product 2: Laptop | Price: $1200.0
--- After p2 Reassignment ---
Product 1: Laptop | Price: $1200.0
Product 2: Mouse | Price: $25.0`,
    hints: [
      'Create a constructor Product(String name, double price).',
      'Show that modifying through shared reference p2 changes p1 before reassignment.',
      'Show that new Product() allocates a fresh Heap block.',
    ],
    solutionCode: `class Product {
    String name;
    double price;

    Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    void printDetails(String label) {
        System.out.println(label + ": " + name + " | Price: $" + price);
    }
}

public class ProductTracer {
    public static void main(String[] args) {
        Product p1 = new Product("Laptop", 1000.0);
        Product p2 = p1; // Shared reference

        p2.price = 1200.0; // Modifies shared heap instance

        p1.printDetails("Product 1");
        p2.printDetails("Product 2");

        System.out.println("--- After p2 Reassignment ---");
        p2 = new Product("Mouse", 25.0); // p2 points to new heap object

        p1.printDetails("Product 1");
        p2.printDetails("Product 2");
    }
}`,
    explanation:
      'Demonstrates constructor initialization, stack reference sharing, in-place heap object mutation, and safe reference reassignment.',
  },
};
