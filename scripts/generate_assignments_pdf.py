import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(40, letter[1] - 30, "JAVA 2.0 · PRACTICAL CODING ASSIGNMENT SERIES")
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.5)
            self.line(40, letter[1] - 34, letter[0] - 40, letter[1] - 34)
            
        # Footer
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(letter[0] - 40, 25, page_text)
        self.drawString(40, 25, "Java 2.0 Practical Laboratory & Code Evaluation · 100% Practical Implementation")
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.5)
        self.line(40, 36, letter[0] - 40, 36)
        
        self.restoreState()


def get_custom_styles():
    styles = getSampleStyleSheet()
    
    styles.add(ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor("#1E3A8A"),
        spaceAfter=4
    ))
    
    styles.add(ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor("#475569"),
        spaceAfter=8
    ))

    styles.add(ParagraphStyle(
        'QuestionHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor("#FFFFFF")
    ))

    styles.add(ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor("#334155"),
        spaceAfter=3
    ))

    styles.add(ParagraphStyle(
        'BodyDarkBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor("#0F172A"),
        spaceAfter=3
    ))

    styles.add(ParagraphStyle(
        'CodeStyle',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=7.2,
        leading=9.5,
        textColor=colors.HexColor("#0F172A"),
        spaceAfter=0
    ))

    styles.add(ParagraphStyle(
        'CalloutText',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor("#1E293B")
    ))

    styles.add(ParagraphStyle(
        'BadgeStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.HexColor("#1E40AF")
    ))

    return styles


def create_header_banner(title, subtitle, modules_tag, styles):
    content = []
    
    tag_table = Table([
        [
            Paragraph("<b>JAVA 2.0 · 100% PRACTICAL CODING LAB EVALUATION</b>", styles['BadgeStyle']),
            Paragraph(f"<b>{modules_tag}</b>", styles['BadgeStyle'])
        ]
    ], colWidths=[330, 202])
    tag_table.setStyle(TableStyle([
        ('ALIGN', (0,0), (0,0), 'LEFT'),
        ('ALIGN', (1,0), (1,0), 'RIGHT'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    content.append(tag_table)
    content.append(Spacer(1, 3))
    
    content.append(Paragraph(title, styles['DocTitle']))
    content.append(Paragraph(subtitle, styles['DocSubtitle']))
    
    # Meta bar table - No marks word
    meta_data = [
        [
            Paragraph("<b>Total Questions:</b> 2 Practical", styles['BodyDarkBold']),
            Paragraph("<b>Difficulty:</b> Easy & Medium", styles['BodyDarkBold']),
            Paragraph("<b>Format:</b> Hands-on Source Code", styles['BodyDarkBold']),
            Paragraph("<b>Compiler:</b> JDK 17+", styles['BodyDarkBold']),
        ]
    ]
    meta_table = Table(meta_data, colWidths=[130, 140, 132, 130])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#EFF6FF")),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#BFDBFE")),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#DBEAFE")),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    content.append(meta_table)
    content.append(Spacer(1, 6))
    
    instructions = (
        "<b>Submission & Execution Rules:</b><br/>"
        "• All solutions must be compilable, working Java source files (<code>.java</code>) executing cleanly with <code>javac</code> and <code>java</code>.<br/>"
        "• Validate user input, avoid unhandled runtime exceptions, and provide formatted console output as demonstrated.<br/>"
        "• Each question must contain clear comments explaining the chosen algorithm and data structure."
    )
    inst_table = Table([[Paragraph(instructions, styles['CalloutText'])]], colWidths=[532])
    inst_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
        ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor("#E2E8F0")),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    content.append(inst_table)
    content.append(Spacer(1, 8))
    
    return content


def create_question_card(level, title, desc, requirements, starter_code, sample_io, criteria, styles, header_color):
    content = []
    
    # Header row with Level Badge - No marks word
    header_table = Table([
        [
            Paragraph(f"<b>[{level.upper()} LEVEL] — {title}</b>", styles['QuestionHeader']),
            Paragraph(f"<b>PRACTICAL LAB</b>", ParagraphStyle('RW', parent=styles['QuestionHeader'], alignment=2))
        ]
    ], colWidths=[420, 112])
    header_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor(header_color)),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    content.append(header_table)
    content.append(Spacer(1, 4))
    
    # Description
    content.append(Paragraph(f"<b>Problem Statement:</b> {desc}", styles['BodyDark']))
    content.append(Spacer(1, 3))
    
    # Requirements
    content.append(Paragraph("<b>Technical Requirements & Implementation Checklist:</b>", styles['BodyDarkBold']))
    for req in requirements:
        content.append(Paragraph(f"• {req}", styles['BodyDark']))
    content.append(Spacer(1, 4))
    
    # Starter Code Box
    if starter_code:
        content.append(Paragraph("<b>Starter Code Template:</b>", styles['BodyDarkBold']))
        formatted_code = "<br/>".join([line.replace(" ", "&nbsp;").replace("<", "&lt;").replace(">", "&gt;") for line in starter_code])
        p_code = Paragraph(formatted_code, styles['CodeStyle'])
        t_code = Table([[p_code]], colWidths=[532])
        t_code.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F1F5F9")),
            ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor("#CBD5E1")),
            ('LEFTPADDING', (0,0), (-1,-1), 8),
            ('RIGHTPADDING', (0,0), (-1,-1), 8),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ]))
        content.append(t_code)
        content.append(Spacer(1, 4))
        
    # Sample Input/Output
    if sample_io:
        content.append(Paragraph("<b>Sample Console Interaction:</b>", styles['BodyDarkBold']))
        formatted_io = "<br/>".join([line.replace(" ", "&nbsp;").replace("<", "&lt;").replace(">", "&gt;") for line in sample_io])
        p_io = Paragraph(formatted_io, styles['CodeStyle'])
        t_io = Table([[p_io]], colWidths=[532])
        t_io.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FEF3C7")),
            ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor("#FDE68A")),
            ('LEFTPADDING', (0,0), (-1,-1), 8),
            ('RIGHTPADDING', (0,0), (-1,-1), 8),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ]))
        content.append(t_io)
        content.append(Spacer(1, 4))
        
    # Evaluation Criteria - No marks word
    if criteria:
        criteria_text = "<b>Evaluation Criteria:</b> " + " | ".join(criteria)
        content.append(Paragraph(criteria_text, styles['CalloutText']))
        content.append(Spacer(1, 8))
        
    return content


def build_assignment_1_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=40,
        bottomMargin=40
    )
    styles = get_custom_styles()
    story = []
    
    story.extend(create_header_banner(
        title="Assignment 1: Java Foundations & Flow Control (Practical)",
        subtitle="Practical Coding Exam: 2 Programming Challenges (Easy & Medium)",
        modules_tag="MODULES 1 & 2 · PRACTICAL LAB",
        styles=styles
    ))
    
    # QUESTION 1 (EASY)
    story.extend(create_question_card(
        level="Easy",
        title="Scientific Temperature & Metric Telemetry Converter",
        desc="Write a standalone program <code>MetricConverter.java</code> that prompts the user for temperature in Celsius and distance in kilometers, then converts them using exact arithmetic and explicit type casting while preventing integer division truncation.",
        requirements=[
            "Convert Celsius to Fahrenheit using formula: <code>F = (C * 9.0 / 5.0) + 32.0</code> (ensure no integer division loss).",
            "Convert Celsius to Kelvin: <code>K = C + 273.15</code>. Check that temperature does not fall below absolute zero (-273.15°C); print an error if invalid.",
            "Convert Kilometers to Miles (1 km = 0.621371 miles) and Nautical Miles (1 km = 0.539957 nmi).",
            "Format all output floating-point values to exactly 2 decimal places using <code>System.out.printf()</code>."
        ],
        starter_code=[
            "import java.util.Scanner;",
            "public class MetricConverter {",
            "    public static void main(String[] args) {",
            "        Scanner sc = new Scanner(System.in);",
            "        System.out.print(\"Enter temperature in Celsius: \");",
            "        double celsius = sc.nextDouble();",
            "        // TODO: Validate absolute zero and compute conversions",
            "    }",
            "}"
        ],
        sample_io=[
            "Enter temperature in Celsius: 37.0",
            "Enter distance in Kilometers: 100.0",
            "--- CONVERSION TELEMETRY ---",
            "Temperature: 37.00 °C = 98.60 °F = 310.15 K",
            "Distance:    100.00 km = 62.14 miles = 54.00 nautical miles"
        ],
        criteria=[
            "Validation & Boundary Check",
            "Correct Math & No Truncation",
            "Formatted Console Output"
        ],
        styles=styles,
        header_color="#0284C7"
    ))
    
    # QUESTION 2 (MEDIUM)
    story.extend(create_question_card(
        level="Medium",
        title="Smart Cash Register & Optimal Currency Dispenser",
        desc="Implement <code>CashRegister.java</code> to model a retail point-of-sale checkout. The program accepts the total purchase amount and the cash tendered by the customer, validates sufficient payment, and dispenses change using the absolute minimum count of bills and coins.",
        requirements=[
            "Prompt for total bill amount and cash tendered. If cash tendered < bill, print the deficit amount and request additional cash in a loop until paid.",
            "Denominations supported: $100, $50, $20, $10, $5, $1 bills, and 25¢ (quarters), 10¢ (dimes), 5¢ (nickels), 1¢ (pennies).",
            "Use integer arithmetic (convert total dollars to cents: <code>totalCents = Math.round(amount * 100)</code>) to avoid IEEE 754 floating-point rounding errors.",
            "Display an itemized tabular breakdown listing only denominations with count > 0, followed by the total physical units dispensed."
        ],
        starter_code=[
            "import java.util.Scanner;",
            "public class CashRegister {",
            "    public static void main(String[] args) {",
            "        Scanner sc = new Scanner(System.in);",
            "        System.out.print(\"Enter Total Bill ($): \");",
            "        double bill = sc.nextDouble();",
            "        // TODO: Loop for sufficient cash and compute change in cents",
            "    }",
            "}"
        ],
        sample_io=[
            "Enter Total Bill ($): 63.42",
            "Enter Cash Tendered ($): 100.00",
            "Change Due: $36.58",
            "  - $20 Bills: 1",
            "  - $10 Bills: 1",
            "  - $5 Bills:  1",
            "  - $1 Bills:  1",
            "  - Quarters (25c): 2",
            "  - Nickels  (5c):  1",
            "  - Pennies  (1c):  3",
            "Total items dispensed: 10"
        ],
        criteria=[
            "Cash loop & deficit validation",
            "Integer cents conversion preventing precision bugs",
            "Clean table formatting"
        ],
        styles=styles,
        header_color="#0D9488"
    ))
    
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated: {output_path}")


def build_assignment_2_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=40,
        bottomMargin=40
    )
    styles = get_custom_styles()
    story = []
    
    story.extend(create_header_banner(
        title="Assignment 2: OOP Foundations, Memory & Pass-by-Value (Practical)",
        subtitle="Practical Coding Exam: 2 Object-Oriented Challenges (Easy & Medium)",
        modules_tag="MODULES 3 & 4 · PRACTICAL LAB",
        styles=styles
    ))
    
    # QUESTION 1 (EASY)
    story.extend(create_question_card(
        level="Easy",
        title="Encapsulated Bank Account with Strict Invariant Guards",
        desc="Create an encapsulated class <code>BankAccount.java</code> and test harness <code>BankApp.java</code> enforcing data hiding and balance integrity.",
        requirements=[
            "Fields: <code>private final String accountNumber</code>, <code>private String accountHolder</code>, <code>private double balance</code>.",
            "Constructors: Provide a 2-arg constructor <code>(accountNumber, accountHolder)</code> that chains to a 3-arg constructor <code>(accountNumber, accountHolder, initialBalance)</code> using <code>this(...)</code>.",
            "Guarded Methods: <code>deposit(double amount)</code> (must be strictly > 0), <code>withdraw(double amount)</code> (cannot be negative, cannot exceed balance; deduct a $2.00 fee if balance falls below $100).",
            "Defensive Getters/Setters: Holder name cannot be null or empty; balance has no public setter.",
            "Write a test script in <code>BankApp.java</code> creating 2 distinct accounts, demonstrating independent Heap states, and proving invalid transactions are rejected."
        ],
        starter_code=[
            "public class BankAccount {",
            "    private final String accountNumber;",
            "    private String accountHolder;",
            "    private double balance;",
            "    // TODO: Implement chained constructors, deposit, withdraw, and display",
            "}"
        ],
        sample_io=[
            "Account ACC-101 created for Alice with $500.00",
            "Deposit $200.00 -> New Balance: $700.00",
            "Withdraw $650.00 -> Under minimum ($100), fee $2.00 applied -> New Balance: $48.00",
            "Withdraw $100.00 -> FAILED: Insufficient funds (Available: $48.00)"
        ],
        criteria=[
            "Encapsulation & constructor chaining",
            "Balance invariant & withdrawal fee logic",
            "Test harness verifying independent states"
        ],
        styles=styles,
        header_color="#0284C7"
    ))
    
    # QUESTION 2 (MEDIUM)
    story.extend(create_question_card(
        level="Medium",
        title="Smart Connected Vehicle Telemetry & Trip Computer",
        desc="Implement <code>VehicleTelemetry.java</code> modeling a vehicle trip computer with overloaded constructors, state tracking, and fuel consumption modeling.",
        requirements=[
            "Fields: <code>vin</code> (String), <code>model</code> (String), <code>fuelCapacityLiters</code> (double), <code>currentFuelLiters</code> (double), <code>odometerKm</code> (double), <code>engineRunning</code> (boolean).",
            "Overloaded Constructors with Chaining: Provide 3 constructors (basic with VIN/model defaulting to 50L capacity, full capacity, and pre-existing mileage), all chaining via <code>this(...)</code>.",
            "Engine Lifecycle: <code>startEngine()</code> only if fuel > 0; <code>stopEngine()</code>.",
            "Trip Execution: <code>drive(double distanceKm, double speedKmH)</code>: Vehicle consumes 0.07L/km at normal speed (<= 90 km/h) and 0.09L/km at high speed (> 90 km/h). If fuel is exhausted mid-trip, calculate exact km traveled before stall.",
            "Write a simulation driver <code>VehicleSimulator.java</code> creating 2 vehicles, driving them on varied trips, and printing trip logs."
        ],
        starter_code=[
            "public class VehicleTelemetry {",
            "    private final String vin;",
            "    private String model;",
            "    private double fuelCapacity;",
            "    private double currentFuel;",
            "    private double odometer;",
            "    private boolean engineRunning;",
            "    // TODO: Overloaded constructors chaining via this() and drive method",
            "}"
        ],
        sample_io=[
            "Vehicle VIN-9801 (Tesla/Civic) initialized. Fuel: 50.0L, Odo: 0.0km",
            "Engine started.",
            "Trip 1: Driving 200 km @ 80 km/h -> Consumed 14.0L fuel. Remaining: 36.0L, Odo: 200.0km",
            "Trip 2: Driving 500 km @ 110 km/h -> Out of fuel after 400.0 km! Engine stalled at Odo: 600.0km"
        ],
        criteria=[
            "Constructor chaining & field encapsulation",
            "Fuel consumption & mid-trip stall calculation",
            "Simulation driver script & formatted reports"
        ],
        styles=styles,
        header_color="#0D9488"
    ))
    
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated: {output_path}")


def build_assignment_3_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=40,
        bottomMargin=40
    )
    styles = get_custom_styles()
    story = []
    
    story.extend(create_header_banner(
        title="Assignment 3: Inheritance, Polymorphism & Abstraction (Practical)",
        subtitle="Practical Coding Exam: 2 Architectural Challenges (Easy & Medium)",
        modules_tag="MODULES 5, 6 & 7 · PRACTICAL LAB",
        styles=styles
    ))
    
    # QUESTION 1 (EASY)
    story.extend(create_question_card(
        level="Easy",
        title="Shape Hierarchy with Dynamic Method Dispatch",
        desc="Implement an extensible shape calculation engine utilizing abstract classes, method overriding with <code>@Override</code>, and runtime dynamic method dispatch.",
        requirements=[
            "Abstract Class: <code>abstract class Shape</code> with private <code>String color</code>, concrete constructor, getter, and abstract methods <code>double calculateArea()</code> and <code>double calculatePerimeter()</code>.",
            "Subclasses: <code>Circle(String color, double radius)</code> and <code>Rectangle(String color, double width, double height)</code> extending <code>Shape</code>.",
            "Dynamic Dispatch Runner: In <code>ShapeRunner.java</code>, instantiate an array of polymorphic references: <code>Shape[] shapes = new Shape[]{ new Circle(\"Red\", 5.0), new Rectangle(\"Blue\", 4.0, 6.0), ... };</code>.",
            "Iterate through the array with an enhanced for-loop, dynamically invoking <code>calculateArea()</code> and <code>calculatePerimeter()</code>, and printing results in a clean table."
        ],
        starter_code=[
            "public abstract class Shape {",
            "    private String color;",
            "    public Shape(String color) { this.color = color; }",
            "    public String getColor() { return color; }",
            "    public abstract double calculateArea();",
            "    public abstract double calculatePerimeter();",
            "}"
        ],
        sample_io=[
            "--- POLYMORPHIC SHAPE RENDERING ---",
            "Shape 1 [Circle - Red]       Area:  78.54 | Perimeter: 31.42",
            "Shape 2 [Rectangle - Blue]   Area:  24.00 | Perimeter: 20.00",
            "Total Accumulated Area: 102.54"
        ],
        criteria=[
            "Abstract class and constructor design",
            "Subclass overriding & formula accuracy",
            "Polymorphic array iteration & dynamic dispatch"
        ],
        styles=styles,
        header_color="#0284C7"
    ))
    
    # QUESTION 2 (MEDIUM)
    story.extend(create_question_card(
        level="Medium",
        title="Employee Payroll System with Multiple Interfaces & Safe Casting",
        desc="Architect an employee payroll processing hierarchy demonstrating multiple interface implementation, compile-time vs runtime polymorphism, and safe downcasting with <code>instanceof</code>.",
        requirements=[
            "<code>abstract class Employee</code>: fields (<code>id</code>, <code>name</code>, <code>basePay</code>), abstract <code>calculateMonthlySalary()</code>, implements <code>Comparable<Employee></code> to sort employees by total compensation descending.",
            "Interface <code>Taxable</code>: method <code>double calculateTax()</code> (15% for salaries > $5,000, 10% otherwise).",
            "Interface <code>BenefitsEligible</code>: method <code>String getHealthcarePlan()</code>.",
            "Concrete Classes: <code>FullTimeEmployee</code> (implements Taxable & BenefitsEligible; gets 20% bonus), <code>Contractor</code> (implements Taxable only; paid by hourly rate * hours).",
            "Downcasting Guard: In <code>PayrollManager.java</code>, loop through employees, invoke polymorphic methods, and use <code>instanceof</code> pattern matching to safely downcast and print benefits ONLY for eligible employees without throwing <code>ClassCastException</code>."
        ],
        starter_code=[
            "public abstract class Employee implements Comparable<Employee> {",
            "    protected String id, name; protected double basePay;",
            "    public Employee(String id, String name, double basePay) { /* TODO */ }",
            "    public abstract double calculateMonthlySalary();",
            "    // TODO: implement compareTo",
            "}"
        ],
        sample_io=[
            "Processing Payroll (Sorted by Highest Compensation):",
            "1. Alice (Full-Time)  | Pay: $7,200.00 | Tax: $1,080.00 | Benefits: Executive Health Plan",
            "2. Bob (Contractor)   | Pay: $4,500.00 | Tax: $450.00   | Benefits: None (Contractor)",
            "Safe downcast verified: No ClassCastException thrown!"
        ],
        criteria=[
            "Abstract class & interface hierarchy",
            "Safe downcasting with instanceof pattern",
            "Comparable sorting & payroll report"
        ],
        styles=styles,
        header_color="#0D9488"
    ))
    
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated: {output_path}")


if __name__ == "__main__":
    output_dir = os.path.join(os.path.dirname(__file__), "..", "public", "assignments")
    os.makedirs(output_dir, exist_ok=True)
    
    p1 = os.path.join(output_dir, "Assignment-1-Java-Foundations.pdf")
    p2 = os.path.join(output_dir, "Assignment-2-OOP-and-Memory.pdf")
    p3 = os.path.join(output_dir, "Assignment-3-Inheritance-and-Abstraction.pdf")
    
    print("Generating Assignment 1 Practical PDF (2 Questions, No Marks Word)...")
    build_assignment_1_pdf(p1)
    
    print("Generating Assignment 2 Practical PDF (2 Questions, No Marks Word)...")
    build_assignment_2_pdf(p2)
    
    print("Generating Assignment 3 Practical PDF (2 Questions, No Marks Word)...")
    build_assignment_3_pdf(p3)
    
    print("All 3 assignment PDFs generated successfully without marks word and with 2 questions each!")
