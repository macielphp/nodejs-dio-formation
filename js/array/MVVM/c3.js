class Employee {
    constructor(name, hired, salary) {
        this.name = name;
        this.hired = hired;
        this.salary = salary;
    }
}

class Team {
    constructor(members = []) {
        this.members = members; //array of Employee objects
    }
}

class TeamViewModel {
    constructor(initialNames = [], hiredDate, salary) {
        this.team = new Team(
            initialNames.map(name => 
                new Employee(name, new Date(hiredDate), salary)
            )
        )
    }

    getMembers() {
        return this.team.members;
    }

    addMembers(name, hired, salary) {
        const exists = this.team.members.some(m => m.name === name);
        if (exists) {
            return `${name} is already a team member.`;
        }

        this.members.push(new Employee(name, new Date(hired), salary));
        return { ok: true, msg: `${name} added successfully`};
    }

    giveRaise(name, percentage) {
        const member = this.team.members.find(m => m.name === name);
        if (!member) {
            return { ok: false, msg: `${name} not found`}
        }
        member.salary += member.salary * (percentage / 100);
        return { ok: true, msg: `${name} received a ${percentage}% raise. New salary is $${member.salary.toFixed(2)}`}
    }
}

const vm = new TeamViewModel(
    ["David", "Bob", "Ruan"],
    "2023-01-15",
    6000
)

console.log("\n--- Team Members ---");
vm.getMembers().forEach(m => {
    console.log(`Name: ${m.name}, hired: ${m.hired.toDateString()} | salary: $${m.salary.toFixed(2)}`)
})

console.log("\n--- Give Raise ---");
console.log(vm.giveRaise("Bob", 10).msg);
console.log(vm.giveRaise("Alice", 5).msg);

console.log("\n--- After Raises ---");
vm.getMembers().forEach(m => {
    console.log(`${m.name} | ${m.hired.toDateString()} | $${m.salary.toFixed(2)}`);
});
