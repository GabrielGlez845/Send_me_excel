import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UserList } from './users';

export const usersConnected = new UserList();


export const connectClient = (client: Socket, io: socketIO.Server) => {

    client.on('connect', () => {
        console.log('Nuevo cliente conectado P')
    });
    console.log('Nuevo cliente conectado')
    // const credentials = new UserCredentials(client.id);
    // const user = new UserEmployee(credentials);

    usersConnected.add('Nuevo');
    io.emit('usuarios-activos', usersConnected.getAll());
}

// export const disconnectClient = (cliente: Socket, io: socketIO.Server) => {
//     cliente.on('disconnect', () => {

//         const client = usersConnected.getUserBySocket(cliente.id);
//         console.log(`🔴  Cliente ${client?.name} desconectado`);

//         usersConnected.delete(cliente.id);
//         io.emit('usuarios-activos', usersConnected.getAll());
//     });
// }

