import React, { useState } from 'react';
import { Terminal } from 'lucide-react';
import { CodePlayground } from '../components/common/CodePlayground';


interface CodePreset {
  id: string;
  name: string;
  module: number;
  description: string;
  code: string;
  expectedOutput: string;
}

const presets: CodePreset[] = [
  {
    id: 'preset-1',
    name: '1. Hello Java & Student Card',
    module: 1,
    description: 'Basic syntax, variables, string concatenation, and main method.',
    code: `public class Main {
    public static void main(String[] args) {
        String studentName = "Rahul Sharma";
        int batchYear = 2026;
        String course = "Mastering Programming using Java";

        System.out.println("======================================");
        System.out.println("Student: " + studentName);
        System.out.println("Course:  " + course);
        System.out.println("Batch:   " + batchYear);
        System.out.println("======================================");
    }
}`,
    expectedOutput: `======================================
Student: Rahul Sharma
Course:  Mastering Programming using Java
Batch:   2026
======================================`,
  },
  {
    id: 'preset-2',
    name: '2. OOP Class & Encapsulation',
    module: 3,
    description: 'Private fields, constructor initialization, and balance protection.',
    code: `class BankAccount {
    private String holder;
    private double balance;

    public BankAccount(String holder, double initialDeposit) {
        this.holder = holder;
        this.balance = initialDeposit;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited $" + amount + " | Balance: $" + balance);
        }
    }

    public void withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
            System.out.println("Withdrew $" + amount + " | Balance: $" + balance);
        } else {
            System.out.println("Declined: Insufficient funds for $" + amount);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount("Sneha Rao", 1000.0);
        acc.deposit(500.0);
        acc.withdraw(300.0);
        acc.withdraw(1500.0);
    }
}`,
    expectedOutput: `Deposited $500.0 | Balance: $1500.0
Withdrew $300.0 | Balance: $1200.0
Declined: Insufficient funds for $1500.0`,
  },
  {
    id: 'preset-3',
    name: '3. Stack vs Heap References',
    module: 4,
    description: 'Reference sharing (s2 = s1) vs creating new object instances.',
    code: `class Student {
    String name;
    int age;

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Rahul", 20);
        Student s2 = s1; // Shared pointer!

        s2.age = 22; // Modifying through s2 alters s1 as well!

        System.out.println("s1.age: " + s1.age);
        System.out.println("s2.age: " + s2.age);

        s2 = new Student("Priya", 24); // s2 points to new heap instance
        System.out.println("After repointing s2:");
        System.out.println("s1: " + s1.name + ", age=" + s1.age);
        System.out.println("s2: " + s2.name + ", age=" + s2.age);
    }
}`,
    expectedOutput: `s1.age: 22
s2.age: 22
After repointing s2:
s1: Rahul, age=22
s2: Priya, age=24`,
  },
  {
    id: 'preset-4',
    name: '4. Dynamic Method Dispatch',
    module: 5,
    description: 'Runtime polymorphism with Animal, Dog, and Cat.',
    code: `class Animal {
    void sound() {
        System.out.println("Animal makes a generic sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Dog barks: Woof Woof!");
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
        Animal[] pets = { new Dog(), new Cat(), new Animal() };

        for (Animal pet : pets) {
            pet.sound(); // Dispatches subclass method dynamically at runtime!
        }
    }
}`,
    expectedOutput: `Dog barks: Woof Woof!
Cat meows: Meow Meow!
Animal makes a generic sound`,
  },
  {
    id: 'preset-5',
    name: '5. Multiple Interfaces',
    module: 6,
    description: 'Implementing multiple contracts: Printable and Savable.',
    code: `interface Printable {
    void print();
}

interface Savable {
    void save();
}

class Report implements Printable, Savable {
    private String title;

    Report(String title) {
        this.title = title;
    }

    @Override
    public void print() {
        System.out.println("[PRINT] Rendering " + title);
    }

    @Override
    public void save() {
        System.out.println("[DB SAVE] Persisting " + title);
    }
}

public class Main {
    public static void main(String[] args) {
        Report r = new Report("2026 Annual Performance Report");
        r.print();
        r.save();
    }
}`,
    expectedOutput: `[PRINT] Rendering 2026 Annual Performance Report
[DB SAVE] Persisting 2026 Annual Performance Report`,
  },
  {
    id: 'preset-6',
    name: '6. Object Class: toString & equals',
    module: 6,
    description: 'Overriding toString and equals for value equality check.',
    code: `class Product {
    private int id;
    private String name;

    Product(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public String toString() {
        return "Product[id=" + id + ", name='" + name + "']";
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Product other = (Product) obj;
        return this.id == other.id && this.name.equals(other.name);
    }
}

public class Main {
    public static void main(String[] args) {
        Product p1 = new Product(101, "Mechanical Keyboard");
        Product p2 = new Product(101, "Mechanical Keyboard");

        System.out.println("Product 1: " + p1);
        System.out.println("p1 == p2 (Memory check): " + (p1 == p2));
        System.out.println("p1.equals(p2) (Value check): " + p1.equals(p2));
    }
}`,
    expectedOutput: `Product 1: Product[id=101, name='Mechanical Keyboard']
p1 == p2 (Memory check): false
p1.equals(p2) (Value check): true`,
  },
  {
    id: 'preset-7',
    name: '7. Constructor Chaining (this & super)',
    module: 7,
    description: 'Chaining constructors in same class and parent hierarchy.',
    code: `class Vehicle {
    protected String brand;

    Vehicle(String brand) {
        this.brand = brand;
        System.out.println("1. Vehicle constructor: " + brand);
    }
}

class Car extends Vehicle {
    private String model;

    Car() {
        this("Default Model"); // Sibling constructor call
        System.out.println("3. Car() 0-arg constructor completed");
    }

    Car(String model) {
        super("Tesla"); // Parent constructor call
        this.model = model;
        System.out.println("2. Car(model) constructor: " + model);
    }
}

public class Main {
    public static void main(String[] args) {
        Car c = new Car();
    }
}`,
    expectedOutput: `1. Vehicle constructor: Tesla
2. Car(model) constructor: Default Model
3. Car() 0-arg constructor completed`,
  },
];

export const PlaygroundPage: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<CodePreset>(presets[0]);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
          <Terminal className="w-4 h-4" />
          <span>Interactive Sandbox</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Java Interactive Code Playground
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Test core Java programs directly in the browser or copy to IntelliJ IDEA. Choose from syllabus presets or write custom Java code.
        </p>
      </div>

      {/* Preset Picker */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Select Syllabus Code Preset (Modules 1–7):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {presets.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPreset(p)}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedPreset.id === p.id
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs truncate">{p.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  selectedPreset.id === p.id ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  Mod {p.module}
                </span>
              </div>
              <p className="text-[11px] opacity-80 mt-1 line-clamp-1">{p.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Code Runner */}
      <CodePlayground
        key={selectedPreset.id}
        initialCode={selectedPreset.code}
        expectedOutput={selectedPreset.expectedOutput}
        title={selectedPreset.name}
      />
    </div>
  );
};
