// ===== MODEL =====
// Represents the data and business logic
class DepartmentModel {
    constructor(employees) {
        this.employees = employees;
        this.departments = this.organizeDepartments();
    }

    organizeDepartments() {
        return {
            engineering: this.findEmployeesByNames(["Alice", "Bob"]),
            marketing: this.findEmployeesByNames(["Carol"]),
            sales: this.findEmployeesByNames(["David", "Emma"]),
            leadership: this.findEmployeesByNames(["Founder Frank"])
        };
    }

    findEmployeesByNames(names) {
        return names
            .map(name => this.employees.find(e => e.name === name))
            .filter(e => e !== undefined);
    }

    getDepartmentsAsArray() {
        return Object.values(this.departments);
    }

    getFlattenedEmployees() {
        return this.getDepartmentsAsArray().flat();
    }

    getConcatenatedEmployees() {
        const { engineering, marketing, sales, leadership } = this.departments;
        return engineering.concat(marketing, sales, leadership);
    }

    createDeepNestedStructure() {
        return [
            [
                [this.employees[0]], // Frank
                [this.employees[1]]  // Alice
            ],
            [
                [this.employees[2], this.employees[3]] // Bob, Carol
            ]
        ];
    }

    flattenDeep(structure, depth) {
        return structure.flat(depth);
    }
}

// ===== VIEWMODEL =====
// Acts as intermediary between Model and View, handles presentation logic
class DepartmentViewModel {
    constructor(model) {
        this.model = model;
    }

    getDepartmentsSummary() {
        const depts = this.model.getDepartmentsAsArray();
        return depts.map((dept, index) => ({
            number: index + 1,
            employees: dept.map(e => e.name),
            count: dept.length
        }));
    }

    getMasterEmployeeList() {
        return this.model.getFlattenedEmployees().map(e => ({
            name: e.name,
            salary: e.salary,
            formatted: `${e.name} ($${e.salary})`
        }));
    }

    getMergedEmployeeList() {
        return this.model.getConcatenatedEmployees().map(e => ({
            name: e.name,
            salary: e.salary,
            formatted: `${e.name} ($${e.salary})`
        }));
    }

    getDeepNestingExample() {
        const deep = this.model.createDeepNestedStructure();
        
        return {
            original: this.formatDeepStructure(deep),
            flat1: this.model.flattenDeep(deep, 1).map(d => d.map(e => e.name)),
            flat2: this.model.flattenDeep(deep, 2).map(e => e.name),
            flatInfinity: this.model.flattenDeep(deep, Infinity).map(e => e.name)
        };
    }

    formatDeepStructure(structure) {
        return structure.map(d => d.map(dd => dd.map(e => e.name)));
    }

    getAllEmployees() {
        return this.model.getFlattenedEmployees();
    }
}

// ===== VIEW =====
// Handles all output/presentation to the console
class DepartmentView {
    displayDepartmentChaos(summary) {
        console.log('\nDepartment chaos: employees get assigned to nested department arrays:');
        summary.forEach(dept => {
            console.log(`Department ${dept.number}: [${dept.employees.join(', ')}]`);
        });
    }

    displayFlatExample(employees) {
        console.log('\n--- Using flat() ---');
        console.log('You need to create one master list, so you use flat():\n');
        console.log('Master list after flat():');
        employees.forEach(emp => {
            console.log(`- ${emp.formatted}`);
        });
    }

    displayConcatExample(employees) {
        console.log('\n--- Using concat() ---');
        console.log('Alternative: merge departments with concat():\n');
        console.log('Merged list with concat():');
        employees.forEach(emp => {
            console.log(`- ${emp.formatted}`);
        });
    }

    displayDeepNestingExample(deepData) {
        console.log('\n--- Bonus: Deep nesting example ---');
        console.log('Deep nested structure (2 levels):');
        console.log('Before flat():', JSON.stringify(deepData.original));
        console.log('\nflat(1) - 1 level:', deepData.flat1);
        console.log('flat(2) - 2 levels:', deepData.flat2);
        console.log('flat(Infinity) - all levels:', deepData.flatInfinity);
    }
}

// ===== USAGE =====
// This is how you'd use it (replace with your actual import)
// import updatedEmployees from "./chapter3.js";

// Example: Create sample data if import isn't available
const updatedEmployees = [
    { name: "Founder Frank", salary: 100000 },
    { name: "Alice", salary: 80000 },
    { name: "Bob", salary: 75000 },
    { name: "Carol", salary: 70000 },
    { name: "David", salary: 65000 },
    { name: "Emma", salary: 68000 }
];

// Initialize MVVM components
const model = new DepartmentModel(updatedEmployees);
const viewModel = new DepartmentViewModel(model);
const view = new DepartmentView();

// Execute the application flow
view.displayDepartmentChaos(viewModel.getDepartmentsSummary());
view.displayFlatExample(viewModel.getMasterEmployeeList());
view.displayConcatExample(viewModel.getMergedEmployeeList());
view.displayDeepNestingExample(viewModel.getDeepNestingExample());

// Export for use in other modules
export default viewModel.getAllEmployees();