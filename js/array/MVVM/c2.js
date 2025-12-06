class Team {
    constructor(members) {
        this.members = members
    }
    displayMembers() {
        this.members.forEach((m) => {
            console.log(`Member: ${m}`)
        })
    }
    addNewMemberToEnd(name) {
        if (!this.members.includes(name)) {
            this.members.push(name)
            console.log(`${name} added to the start of the team.`)
        } else {
            let nameIndex = this.members.indexOf(name)
            console.log(`${name} is already a team member. Index: ${nameIndex}`)
        }
    } 
    addNewMemberToStart(name) {
        if (!this.members.includes(name)) {
            this.members.unshift(name)
            console.log(`${name} added to the start of the team.`)
        } else {
            let nameIndex = this.members.indexOf(name)
            console.log(`${name} is already a team member. Index: ${nameIndex}`)
        }
    } 
}

let team = new Team(["David", "Bob", "Ruan"])
team.displayMembers()

team.addNewMemberToEnd('Dove')
team.addNewMemberToEnd('Dina')
team.addNewMemberToEnd('Bob') // Duplicate, should not be added
team.addNewMemberToStart('Founder Fox')
team.addNewMemberToStart('CTO Tiger')

team.displayMembers()