export type QuestionDifficulty = 'Easy' | 'Medium';

export interface PracticalQuestion {
  id: string;
  level: QuestionDifficulty;
  title: string;
  description: string;
  requirements: string[];
  starterCode: string;
  sampleIO: string;
  hint?: string;
  solutionOutline?: string;
  evaluationCriteria: string[];
}

export interface CourseAssignment {
  id: number;
  title: string;
  subtitle: string;
  modulesCovered: number[];
  daysCovered: string;
  estimatedTime: string;
  difficulty: string;
  pdfFileName: string;
  pdfUrl: string;
  summary: string;
  learningObjectives: string[];
  questions: PracticalQuestion[];
}

export const assignmentsData: CourseAssignment[] = [
  {
    id: 1,
    title: 'Assignment 1: Java Foundations & Flow Control (Practical)',
    subtitle: 'Practical Coding Lab: 2 Programming Challenges (Easy & Medium)',
    modulesCovered: [1, 2],
    daysCovered: 'Day 1 & Day 2',
    estimatedTime: '2.0 Hours',
    difficulty: 'Beginner to Intermediate',
    pdfFileName: 'Assignment-1-Java-Foundations.pdf',
    pdfUrl: '/assignments/Assignment-1-Java-Foundations.pdf',
    summary:
      'A 100% hands-on practical assignment covering primitive data types, explicit type casting, arithmetic without integer division truncation, and point-of-sale currency denomination breakdown.',
    learningObjectives: [
      'Implement console input parsing with Scanner and perform exact conversions avoiding truncation.',
      'Solve retail change dispensing with integer modulus arithmetic to avoid IEEE 754 floating-point errors.',
    ],
    questions: [
      {
        id: 'a1-q1',
        level: 'Easy',
        title: 'Scientific Temperature & Metric Telemetry Converter',
        description:
          'Write a standalone program MetricConverter.java that prompts the user for temperature in Celsius and distance in kilometers, then converts them using exact arithmetic and explicit type casting while preventing integer division truncation.',
        requirements: [
          'Convert Celsius to Fahrenheit using formula: F = (C * 9.0 / 5.0) + 32.0 (ensure no integer division loss).',
          'Convert Celsius to Kelvin: K = C + 273.15. Check that temperature does not fall below absolute zero (-273.15°C); print an informative error if invalid.',
          'Convert Kilometers to Miles (1 km = 0.621371 miles) and Nautical Miles (1 km = 0.539957 nmi).',
          'Format all output floating-point values to exactly 2 decimal places using System.out.printf().',
        ],
        starterCode: `import java.util.Scanner;

public class MetricConverter {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter temperature in Celsius: ");
        double celsius = sc.nextDouble();
        
        System.out.print("Enter distance in Kilometers: ");
        double km = sc.nextDouble();

        // TODO: Validate absolute zero (-273.15 C)
        // TODO: Compute Fahrenheit, Kelvin, Miles, and Nautical Miles
        // TODO: Print formatted telemetry table with printf("%.2f", ...)
    }
}`,
        sampleIO: `Enter temperature in Celsius: 37.0
Enter distance in Kilometers: 100.0
--- CONVERSION TELEMETRY ---
Temperature: 37.00 °C = 98.60 °F = 310.15 K
Distance:    100.00 km = 62.14 miles = 54.00 nautical miles`,
        hint: 'Use 9.0 / 5.0 instead of 9 / 5. In Java, 9 / 5 performs integer division which evaluates to 1, losing accuracy!',
        solutionOutline:
          '1. Read inputs with Scanner.\n2. Check if celsius < -273.15; if true, print error and exit.\n3. double fahrenheit = (celsius * 9.0 / 5.0) + 32.0;\n4. double kelvin = celsius + 273.15;\n5. double miles = km * 0.621371;\n6. double nauticalMiles = km * 0.539957;\n7. Print with System.out.printf().',
        evaluationCriteria: [
          'Input validation & absolute zero check',
          'Correct formulas & avoiding integer division truncation',
          'Clean formatted console output using printf',
        ],
      },
      {
        id: 'a1-q2',
        level: 'Medium',
        title: 'Smart Cash Register & Optimal Currency Dispenser',
        description:
          'Implement CashRegister.java to model a retail point-of-sale checkout. The program accepts the total purchase amount and the cash tendered by the customer, validates sufficient payment, and dispenses change using the absolute minimum count of bills and coins.',
        requirements: [
          'Prompt for total bill amount and cash tendered. If cash tendered < bill, print the deficit amount and request additional cash in a loop until paid.',
          'Denominations supported: $100, $50, $20, $10, $5, $1 bills, and 25¢ (quarters), 10¢ (dimes), 5¢ (nickels), 1¢ (pennies).',
          'Use integer arithmetic (convert total dollars to cents: totalCents = Math.round(amount * 100)) to avoid IEEE 754 floating-point rounding errors.',
          'Display an itemized tabular breakdown listing only denominations with count > 0, followed by the total physical units dispensed.',
        ],
        starterCode: `import java.util.Scanner;

public class CashRegister {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter Total Bill ($): ");
        double bill = sc.nextDouble();

        double tendered = 0.0;
        // TODO: Loop until tendered >= bill
        // TODO: Calculate change in integer cents to prevent floating point inaccuracy
        // TODO: Decompose cents into bills and coins with / and %
    }
}`,
        sampleIO: `Enter Total Bill ($): 63.42
Enter Cash Tendered ($): 50.00
Insufficient payment! Deficit: $13.42. Enter additional cash: 50.00
Total Cash Received: $100.00
Change Due: $36.58
  - $20 Bills: 1
  - $10 Bills: 1
  - $5 Bills:  1
  - $1 Bills:  1
  - Quarters (25c): 2
  - Nickels  (5c):  1
  - Pennies  (1c):  3
Total items dispensed: 10`,
        hint: 'Never use float/double directly for financial subtraction (e.g. 100.0 - 63.42 can produce 36.580000000000005). Multiply by 100 and round to long cents!',
        solutionOutline:
          '1. Loop while tendered < bill: prompt for additional cash.\n2. long changeCents = Math.round((tendered - bill) * 100);\n3. Define int[] values = {10000, 5000, 2000, 1000, 500, 100, 25, 10, 5, 1};\n4. Loop through denominations: count = changeCents / val; changeCents %= val;\n5. Print denominations with count > 0 and sum total dispensed.',
        evaluationCriteria: [
          'Payment loop & deficit calculation',
          'Integer cents conversion preventing precision bugs',
          'Tabular itemized change breakdown & unit count',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Assignment 2: OOP Foundations, Memory & Pass-by-Value (Practical)',
    subtitle: 'Practical Coding Lab: 2 Object-Oriented Challenges (Easy & Medium)',
    modulesCovered: [3, 4],
    daysCovered: 'Day 2 & Day 3',
    estimatedTime: '2.0 Hours',
    difficulty: 'Intermediate',
    pdfFileName: 'Assignment-2-OOP-and-Memory.pdf',
    pdfUrl: '/assignments/Assignment-2-OOP-and-Memory.pdf',
    summary:
      'Practical evaluations centered on creating encapsulated classes, preserving invariants with guarded mutators, constructor overloading with this(...) chaining, and vehicle trip telemetry modeling.',
    learningObjectives: [
      'Enforce encapsulation with private fields, defensive validation, and constructor chaining.',
      'Model state machines and telemetry fuel calculations in object instances.',
    ],
    questions: [
      {
        id: 'a2-q1',
        level: 'Easy',
        title: 'Encapsulated Bank Account with Strict Invariant Guards',
        description:
          'Create an encapsulated class BankAccount.java and test harness BankApp.java enforcing data hiding and balance integrity.',
        requirements: [
          'Fields: private final String accountNumber, private String accountHolder, private double balance.',
          'Constructors: Provide a 2-arg constructor (accountNumber, accountHolder) chaining to a 3-arg constructor (accountNumber, accountHolder, initialBalance) using this(...).',
          'Guarded Methods: deposit(double amount) (must be strictly > 0), withdraw(double amount) (cannot be negative, cannot exceed balance; deduct a $2.00 fee if balance falls below $100.00).',
          'Defensive Getters/Setters: Holder name cannot be null or blank; balance has no public setter.',
          'Write a test script in BankApp.java creating 2 distinct accounts, demonstrating independent Heap states, and proving invalid transactions are rejected.',
        ],
        starterCode: `public class BankAccount {
    private final String accountNumber;
    private String accountHolder;
    private double balance;

    public BankAccount(String accountNumber, String accountHolder) {
        this(accountNumber, accountHolder, 0.0);
    }

    public BankAccount(String accountNumber, String accountHolder, double initialBalance) {
        if (accountNumber == null || accountNumber.isBlank()) {
            throw new IllegalArgumentException("Account number cannot be empty");
        }
        this.accountNumber = accountNumber;
        setAccountHolder(accountHolder);
        if (initialBalance < 0) {
            throw new IllegalArgumentException("Initial balance cannot be negative");
        }
        this.balance = initialBalance;
    }

    // TODO: Implement setAccountHolder, deposit, withdraw, and displaySummary
}`,
        sampleIO: `Account ACC-101 created for Alice with $500.00
Deposit $200.00 -> New Balance: $700.00
Withdraw $650.00 -> Under minimum ($100), fee $2.00 applied -> New Balance: $48.00
Withdraw $100.00 -> FAILED: Insufficient funds (Available: $48.00)`,
        hint: 'Use this(accountNumber, accountHolder, 0.0) in the two-parameter constructor to delegate initialization to the primary constructor.',
        solutionOutline:
          '1. Setters validate accountHolder is not null or blank.\n2. In withdraw: check amount > 0 and amount <= balance. If balance - amount < 100, add $2 fee.\n3. Test file demonstrates independent balances across two accounts.',
        evaluationCriteria: [
          'Encapsulation & constructor chaining via this(...)',
          'Balance invariant & fee deduction logic',
          'Test harness verifying independent Heap states',
        ],
      },
      {
        id: 'a2-q2',
        level: 'Medium',
        title: 'Smart Connected Vehicle Telemetry & Trip Computer',
        description:
          'Implement VehicleTelemetry.java modeling a vehicle trip computer with overloaded constructors, state tracking, and fuel consumption modeling.',
        requirements: [
          'Fields: vin (String), model (String), fuelCapacityLiters (double), currentFuelLiters (double), odometerKm (double), engineRunning (boolean).',
          'Overloaded Constructors with Chaining: Provide 3 constructors (basic with VIN/model defaulting to 50L capacity, full capacity, and pre-existing mileage), all chaining via this(...).',
          'Engine Lifecycle: startEngine() only if fuel > 0; stopEngine().',
          'Trip Execution: drive(double distanceKm, double speedKmH): Vehicle consumes 0.07L/km at normal speed (<= 90 km/h) and 0.09L/km at high speed (> 90 km/h). If fuel is exhausted mid-trip, calculate exact km traveled before stall.',
          'Write a simulation driver VehicleSimulator.java creating 2 vehicles, driving them on varied trips, and printing trip logs.',
        ],
        starterCode: `public class VehicleTelemetry {
    private final String vin;
    private final String model;
    private double fuelCapacity;
    private double currentFuel;
    private double odometer;
    private boolean engineRunning;

    // TODO: Overloaded constructors chaining via this(...)
    // TODO: startEngine(), stopEngine(), refuel(double liters)
    // TODO: drive(double distanceKm, double speedKmH)
}`,
        sampleIO: `Vehicle VIN-9801 (Tesla/Civic) initialized. Fuel: 50.0L, Odo: 0.0km
Engine started.
Trip 1: Driving 200 km @ 80 km/h -> Consumed 14.0L fuel. Remaining: 36.0L, Odo: 200.0km
Trip 2: Driving 500 km @ 110 km/h -> Out of fuel after 400.0 km! Engine stalled at Odo: 600.0km`,
        hint: 'Calculate maxDist = currentFuel / ratePerKm. If requested distance > maxDist, travel maxDist, set fuel to 0, stop engine, and report partial trip completion.',
        solutionOutline:
          '1. Overloaded constructors delegate to master constructor.\n2. In drive(): check engineRunning. rate = speed > 90 ? 0.09 : 0.07.\n3. If distance * rate <= currentFuel, complete trip. Else travel partial distance and stop engine.\n4. Simulator creates 2 instances and logs trip summaries.',
        evaluationCriteria: [
          'Constructor chaining & state encapsulation',
          'Fuel consumption & mid-trip stall calculation',
          'Simulation driver script & formatted reports',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Assignment 3: Inheritance, Polymorphism & Abstraction (Practical)',
    subtitle: 'Practical Coding Lab: 2 Architectural Challenges (Easy & Medium)',
    modulesCovered: [5, 6, 7],
    daysCovered: 'Day 4 & Day 5',
    estimatedTime: '2.5 Hours',
    difficulty: 'Intermediate to Advanced',
    pdfFileName: 'Assignment-3-Inheritance-and-Abstraction.pdf',
    pdfUrl: '/assignments/Assignment-3-Inheritance-and-Abstraction.pdf',
    summary:
      'Practical architectural assignments covering abstract class contracts, dynamic method dispatch, and a polymorphic payroll system with interface realization and safe downcasting with instanceof.',
    learningObjectives: [
      'Design abstract class templates and implement concrete subclasses with runtime polymorphic dispatch.',
      'Implement multiple interfaces and perform safe guarded downcasting with instanceof.',
    ],
    questions: [
      {
        id: 'a3-q1',
        level: 'Easy',
        title: 'Shape Hierarchy with Dynamic Method Dispatch',
        description:
          'Implement an extensible shape calculation engine utilizing abstract classes, method overriding with @Override, and runtime dynamic method dispatch.',
        requirements: [
          'Abstract Class: abstract class Shape with private String color, concrete constructor, getter, and abstract methods double calculateArea() and double calculatePerimeter().',
          'Subclasses: Circle(String color, double radius) and Rectangle(String color, double width, double height) extending Shape.',
          'Dynamic Dispatch Runner: In ShapeRunner.java, instantiate an array of polymorphic references: Shape[] shapes = new Shape[]{ new Circle("Red", 5.0), new Rectangle("Blue", 4.0, 6.0), ... };.',
          'Iterate through the array with an enhanced for-loop, dynamically invoking calculateArea() and calculatePerimeter(), and printing results in a clean table.',
        ],
        starterCode: `public abstract class Shape {
    private String color;

    public Shape(String color) {
        this.color = color;
    }
    public String getColor() { return color; }
    public abstract double calculateArea();
    public abstract double calculatePerimeter();
}

// TODO: Implement Circle and Rectangle extending Shape
// TODO: Implement ShapeRunner with Shape[] array and dynamic method dispatch`,
        sampleIO: `--- POLYMORPHIC SHAPE RENDERING ---
Shape 1 [Circle - Red]       Area:  78.54 | Perimeter: 31.42
Shape 2 [Rectangle - Blue]   Area:  24.00 | Perimeter: 20.00
Total Accumulated Area: 102.54`,
        hint: 'Notice that in the for (Shape s : shapes) loop, s.calculateArea() invokes Circle\'s method or Rectangle\'s method based on the actual object on the Heap, not the reference type!',
        solutionOutline:
          '1. Define abstract class Shape with abstract methods.\n2. Circle extends Shape with radius; overrides area (pi*r*r) and perimeter (2*pi*r).\n3. Rectangle extends Shape with width, height; overrides area (w*h) and perimeter (2*(w+h)).\n4. ShapeRunner creates Shape[] array, sums areas, and formats output.',
        evaluationCriteria: [
          'Abstract class & constructor design',
          'Subclass overriding & formula accuracy',
          'Polymorphic array iteration & dynamic dispatch',
        ],
      },
      {
        id: 'a3-q2',
        level: 'Medium',
        title: 'Employee Payroll System with Multiple Interfaces & Safe Casting',
        description:
          'Architect an employee payroll processing hierarchy demonstrating multiple interface implementation, compile-time vs runtime polymorphism, and safe downcasting with instanceof.',
        requirements: [
          'abstract class Employee: fields (id, name, basePay), abstract calculateMonthlySalary(), implements Comparable<Employee> to sort employees by total compensation descending.',
          'Interface Taxable: method double calculateTax() (15% for salaries > $5,000, 10% otherwise).',
          'Interface BenefitsEligible: method String getHealthcarePlan().',
          'Concrete Classes: FullTimeEmployee (implements Taxable & BenefitsEligible; gets 20% bonus), Contractor (implements Taxable only; paid by hourly rate * hours).',
          'Downcasting Guard: In PayrollManager.java, loop through employees, invoke polymorphic methods, and use instanceof pattern matching to safely downcast and print benefits ONLY for eligible employees without throwing ClassCastException.',
        ],
        starterCode: `public abstract class Employee implements Comparable<Employee> {
    protected String id;
    protected String name;
    protected double basePay;

    public Employee(String id, String name, double basePay) {
        this.id = id; this.name = name; this.basePay = basePay;
    }
    public abstract double calculateMonthlySalary();
    public int compareTo(Employee other) {
        return Double.compare(other.calculateMonthlySalary(), this.calculateMonthlySalary());
    }
}

interface Taxable { double calculateTax(); }
interface BenefitsEligible { String getHealthcarePlan(); }

// TODO: Implement FullTimeEmployee and Contractor
// TODO: Implement PayrollManager with safe downcasting guard`,
        sampleIO: `Processing Payroll (Sorted by Highest Compensation):
1. Alice (Full-Time)  | Pay: $7,200.00 | Tax: $1,080.00 | Benefits: Executive Health Plan
2. Bob (Contractor)   | Pay: $4,500.00 | Tax: $450.00   | Benefits: None (Contractor)
Safe downcast verified: No ClassCastException thrown!`,
        hint: 'Use if (emp instanceof BenefitsEligible be) { be.getHealthcarePlan(); } to guard against ClassCastException when handling contractors.',
        solutionOutline:
          '1. FullTimeEmployee extends Employee, implements Taxable, BenefitsEligible.\n2. Contractor extends Employee, implements Taxable.\n3. PayrollManager sorts with Arrays.sort(employees).\n4. In loop, call emp.calculateMonthlySalary(). If emp instanceof BenefitsEligible, print plan.',
        evaluationCriteria: [
          'Abstract class & interface hierarchy design',
          'Safe downcasting with instanceof pattern matching',
          'Comparable sorting & payroll report generation',
        ],
      },
    ],
  },
];
