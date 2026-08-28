import type { ModuleData } from '../types/course';

export const module2Data: ModuleData = {
  id: 2,
  title: 'Module 2: Java Basics & Flow Control',
  subtitle: 'Day 1 (Part 2) & Day 2 · Data Types, Operators, Logic, and Loops',
  day: 1,
  estimatedHours: 3,
  description:
    'Core syntax essentials: 8 primitive data types, variables, constants, type safety, operators, conditional branching (if/switch), and looping constructs.',
  topicsCovered: [
    'Keywords vs Identifiers (Rules & Conventions)',
    'Primitive Data Types (byte, short, int, long, float, double, char, boolean)',
    'Variables, Literals & Constants (final keyword)',
    'Naming Conventions (camelCase, PascalCase, UPPER_SNAKE_CASE)',
    'Operators (Arithmetic, Relational, Logical, Unary, Ternary)',
    'Conditional Branching (if, if-else, switch-case)',
    'Loops (for, while, do-while, enhanced for-each)',
    'Jump Statements (break & continue)',
  ],
  concepts: [
    {
      id: 'm2-data-types',
      title: 'Primitive Data Types & Memory Sizes',
      shortIdea: 'Java provides 8 strongly typed primitives with fixed memory sizes across all platforms.',
      moduleNumber: 2,
      dayNumber: 1,
      category: 'Type System',
      customVisualizer: 'data-types-grid',
      visualExplanation: {
        title: 'The 8 Primitive Data Types Hierarchy',
        diagramText: `
 ┌────────────────────────────────────────────────────────────────────────┐
 │ Data Type │ Size (bits/bytes) │ Range / Values           │ Default     │
 ├───────────┼───────────────────┼──────────────────────────┼─────────────┤
 │ byte      │ 8 bits (1 byte)   │ -128 to 127              │ 0           │
 │ short     │ 16 bits (2 bytes) │ -32,768 to 32,767        │ 0           │
 │ int       │ 32 bits (4 bytes) │ -2^31 to 2^31 - 1        │ 0           │
 │ long      │ 64 bits (8 bytes) │ -2^63 to 2^63 - 1 (use L)│ 0L          │
 │ float     │ 32 bits (4 bytes) │ 6-7 decimal digits (f)   │ 0.0f        │
 │ double    │ 64 bits (8 bytes) │ 15 decimal digits        │ 0.0d        │
 │ char      │ 16 bits (2 bytes) │ '\\u0000' to '\\uffff' (Unicode) │ '\\u0000'   │
 │ boolean   │ 1 bit (JVM dep.)  │ true or false            │ false       │
 └────────────────────────────────────────────────────────────────────────┘
        `,
        note: 'Unlike C/C++ where int size depends on OS bitness (16/32/64 bit), Java primitive sizes are strictly fixed everywhere!',
      },
      diagramImage: {
        src: '/images/java_primitive_data_types_memory.jpg',
        alt: 'The 8 Primitive Data Types in Java: Memory Layout & Defaults',
        caption: 'Memory footprint: Integers (byte 8-bit, short 16-bit, int 32-bit, long 64-bit with L), Floating-Point (float 32-bit with f, double 64-bit), Character (char 16-bit Unicode), and Boolean (1-bit true/false).',
      },
      javaExample: `public class DataTypesDemo {
    public static void main(String[] args) {
        int age = 21;
        double salary = 75000.50;
        char grade = 'A';
        boolean isEnrolled = true;
        final double PI = 3.14159; // Constant

        System.out.println("Age: " + age + " years");
        System.out.println("Salary: $" + salary);
        System.out.println("Grade: " + grade);
        System.out.println("Enrolled: " + isEnrolled);
        System.out.println("Constant PI: " + PI);
    }
}`,
      expectedOutput: `Age: 21 years
Salary: $75000.5
Grade: A
Enrolled: true
Constant PI: 3.14159`,
      teachingMode: {
        explain2Min: [
          'Java is strictly and statically typed: every variable must have a declared type before use.',
          'Primitive types store raw binary values directly in memory (Stack), unlike reference objects.',
          'char in Java is 2 bytes (16 bits) because Java uses Unicode (UTF-16) to support international characters, not 1-byte ASCII.',
          'Constants use the "final" keyword: once assigned, value cannot be mutated.',
        ],
        drawTips:
          'Draw a table with 4 columns: Type | Category (Int / Float / Char / Bool) | Bytes | Example literal. Highlight char = 2 bytes.',
        codeHighlight: 'Notice float requires an f suffix (float f = 3.14f;), otherwise 3.14 is treated as a double literal.',
        studentQuestion: 'Why is char 2 bytes in Java whereas in C/C++ it is typically 1 byte?',
        studentAnswer: 'C/C++ char was designed for 1-byte ASCII (128-256 characters), while Java was built from day one for global Unicode (65,536+ international characters).',
      },
      quizzes: [
        {
          id: 'q2-1',
          question: 'What is the default value of a boolean instance variable in Java?',
          options: ['true', 'false', '0', 'null'],
          correctAnswerIndex: 1,
          explanation: 'In Java, boolean instance variables default to false.',
        },
        {
          id: 'q2-2',
          question: 'Which of the following will cause a compilation error?',
          options: [
            'long count = 1000L;',
            'float price = 19.99;',
            'double tax = 0.05;',
            'char symbol = \'@\';',
          ],
          correctAnswerIndex: 1,
          explanation: '19.99 is a double literal by default in Java. Assigning a double to float requires either an explicit cast (float) or suffix 19.99f.',
        },
      ],
    },
    {
      id: 'm2-operators-logic',
      title: 'Operators & Logical Evaluation',
      shortIdea: 'Operators manipulate primitives; short-circuit logical operators (&&, ||) prevent unnecessary right-hand evaluation.',
      moduleNumber: 2,
      dayNumber: 1,
      category: 'Syntax',
      visualExplanation: {
        title: 'Short-Circuit Logic vs Bitwise Evaluation',
        diagramText: `
  [ Condition A ] && [ Condition B ]
         │
    Is A false? ──── YES ───► Result is FALSE (Skip evaluating B!)
         │
         NO
         ▼
    Evaluate Condition B
        `,
        note: 'Short-circuiting (&&, ||) is critical when Condition B might throw NullPointerException if Condition A is false (e.g., student != null && student.hasPassed()).',
      },
      javaExample: `public class OperatorsDemo {
    public static void main(String[] args) {
        int score = 85;
        int attendance = 90;

        // Logical AND + Ternary operator
        boolean isEligible = (score >= 80) && (attendance >= 75);
        String result = isEligible ? "HONORS PASS" : "REGULAR";

        System.out.println("Score: " + score + ", Attendance: " + attendance + "%");
        System.out.println("Eligible for Honors: " + isEligible);
        System.out.println("Status: " + result);

        // Pre-increment vs Post-increment
        int count = 5;
        System.out.println("Post-increment: " + (count++)); // prints 5, then count becomes 6
        System.out.println("Pre-increment: " + (++count));  // count becomes 7, prints 7
    }
}`,
      expectedOutput: `Score: 85, Attendance: 90%
Eligible for Honors: true
Status: HONORS PASS
Post-increment: 5
Pre-increment: 7`,
      teachingMode: {
        explain2Min: [
          'Pre-increment (++x): increment first, then evaluate expression.',
          'Post-increment (x++): evaluate expression first, then increment value.',
          'Ternary operator: condition ? valueIfTrue : valueIfFalse (clean inline if-else).',
          'Short-circuit: && stops if left is false; || stops if left is true.',
        ],
        drawTips: 'Draw two paths on board for (A && B): If A is false, draw a big red X cutting off evaluation of B.',
        codeHighlight: 'Highlight the difference between = (assignment) and == (relational equality check).',
        studentQuestion: 'What will be printed by: int x = 5; System.out.println(x++ + ++x); ?',
        studentAnswer: 'x++ returns 5 (and x becomes 6). Then ++x increments x to 7 and returns 7. 5 + 7 = 12.',
      },
      quizzes: [
        {
          id: 'q2-3',
          question: 'What is the value of result after: int a = 10; int result = ++a * 2;',
          options: ['20', '22', '21', '10'],
          correctAnswerIndex: 1,
          explanation: '++a increments a from 10 to 11 first, then 11 * 2 equals 22.',
        },
      ],
    },
    {
      id: 'm2-flow-control',
      title: 'Flow Control: Conditionals & Loops',
      shortIdea: 'Branching (if-else, switch) controls decision paths; loops (for, while, do-while, for-each) repeat instructions.',
      moduleNumber: 2,
      dayNumber: 1,
      category: 'Control Flow',
      visualExplanation: {
        title: 'Decision & Looping Pathways',
        diagramText: `
       [ Condition ]
        /         \\
     true        false
      /             \\
 [ Action A ]    [ Action B ]
      \\             /
       ▼           ▼
        [ Next Step ]

 Loop Lifecycle:
 1. Initialization ──► 2. Condition Check ──(true)──► 3. Body Execution
                              │                                │
                           (false)                             ▼
                              ▼                      4. Update/Increment
                         [ Exit Loop ]                        │
                              ▲                               │
                              └───────────────────────────────┘
        `,
        note: 'while checks condition before entering; do-while guarantees at least ONE execution before testing condition.',
      },
      javaExample: `public class FlowControlDemo {
    public static void main(String[] args) {
        // 1. Switch Statement
        int dayOfWeek = 3;
        String dayName;
        switch (dayOfWeek) {
            case 1: dayName = "Monday"; break;
            case 2: dayName = "Tuesday"; break;
            case 3: dayName = "Wednesday"; break;
            case 4: dayName = "Thursday"; break;
            case 5: dayName = "Friday"; break;
            default: dayName = "Weekend"; break;
        }
        System.out.println("Day " + dayOfWeek + " is " + dayName);

        // 2. Enhanced For-Each Loop
        int[] scores = {88, 92, 79, 95};
        int total = 0;
        for (int s : scores) {
            total += s;
        }
        System.out.println("Average Score: " + (total / (double) scores.length));
    }
}`,
      expectedOutput: `Day 3 is Wednesday
Average Score: 88.5`,
      tryItCode: `public class LoopPractice {
    public static void main(String[] args) {
        System.out.println("Multiplication Table for 3:");
        for (int i = 1; i <= 5; i++) {
            System.out.println("3 x " + i + " = " + (3 * i));
        }
    }
}`,
      teachingMode: {
        explain2Min: [
          'if-else is best for range/boolean conditions (e.g. score >= 90).',
          'switch-case is ideal for discrete discrete equality matching (int, String, enum, char). Remember "break" to avoid fallthrough!',
          'for loop: known number of iterations (init; condition; update).',
          'for-each (enhanced for): clean syntax for iterating arrays & collections without managing manual index i.',
        ],
        drawTips: 'Draw the switch fall-through hazard on the board: show how missing break cascades down to subsequent cases.',
        codeHighlight: 'Show the explicit cast (double) scores.length to prevent integer division truncation (e.g. 88 instead of 88.5).',
        studentQuestion: 'What happens if we forget to put a "break" statement inside a matching switch case?',
        studentAnswer: 'Fall-through occurs: execution will continue into the subsequent case blocks regardless of whether their labels match, until a break or the end of switch is reached.',
      },
      quizzes: [
        {
          id: 'q2-4',
          question: 'Which loop guarantees that the body of the loop executes at least once?',
          options: ['for loop', 'while loop', 'do-while loop', 'enhanced for-each loop'],
          correctAnswerIndex: 2,
          explanation: 'do-while checks its test condition at the bottom after executing the loop body once.',
        },
      ],
    },
  ],
  miniChallenge: {
    id: 'ch-m2',
    moduleNumber: 2,
    title: 'Challenge 2: Grade Classifier & Statistics',
    difficulty: 'Beginner',
    problem:
      'Given an array of student marks `{72, 95, 84, 61, 45, 88}`, write a Java program to:\n1. Classify each grade using if-else (>=90: A, >=80: B, >=70: C, >=60: D, else: F)\n2. Calculate the highest score, lowest score, and class average.',
    starterCode: `public class GradeStats {
    public static void main(String[] args) {
        int[] marks = {72, 95, 84, 61, 45, 88};
        
        // TODO: Calculate highest, lowest, average and print summary
        
    }
}`,
    expectedOutput: `=== CLASS GRADE REPORT ===
Total Students: 6
Highest Score: 95
Lowest Score: 45
Class Average: 74.17
Scores >= 80: 3 students`,
    hints: [
      'Initialize max = marks[0] and min = marks[0].',
      'Use a for-each loop to compute the running sum and update min/max.',
      'Format average using String.format("%.2f", average).',
    ],
    solutionCode: `public class GradeStats {
    public static void main(String[] args) {
        int[] marks = {72, 95, 84, 61, 45, 88};
        
        int highest = marks[0];
        int lowest = marks[0];
        int sum = 0;
        int honorsCount = 0;

        for (int m : marks) {
            if (m > highest) highest = m;
            if (m < lowest) lowest = m;
            sum += m;
            if (m >= 80) honorsCount++;
        }

        double average = (double) sum / marks.length;

        System.out.println("=== CLASS GRADE REPORT ===");
        System.out.println("Total Students: " + marks.length);
        System.out.println("Highest Score: " + highest);
        System.out.println("Lowest Score: " + lowest);
        System.out.println("Class Average: " + String.format("%.2f", average));
        System.out.println("Scores >= 80: " + honorsCount + " students");
    }
}`,
    explanation:
      'Demonstrates array traversal, comparison operators, conditional branching, accumulation logic, and type casting for floating point division.',
  },
};
