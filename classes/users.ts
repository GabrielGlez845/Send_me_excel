

// const io = Server.instance.io;
export class UserList {
    private list: string[] = [];

    public add(user: string) {
        this.list.push(user);
        console.log(`🟢 Usuario ${user} registrado en la red`);
        return user;
    }


    public getAll() {
        return this.list;
    }

}