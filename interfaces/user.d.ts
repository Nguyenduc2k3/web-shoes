// export interface newUser {
//     firstName: string,
//     lastName: string
//     email: string
//     password: string
// }

// export interface User {
//     email: string
//     password: string
// }

// export interface GetUsersQuery {
//     page?: number;
//     limit?: number;
//     query?: string;
//     color?: string;
//     gender?: string;
//     category?: string;
//     min?: number;
//     max?: number;
//     sort?: string
// }

// interface ListUser {
//     id: string;
//     email: string;
//     firstName: string;
//     lastName: string;
//     admin: boolean;
//     createdAt?: string;
// }

// interface Role {
//     id: string;
//     role: boolean;
// }
// export interface ProfileProps {
//     email: string
//     firstName: string
//     lastName: string
//     profile: {
//         address: string
//         birthDay: Date
//         phoneNumber: number
//         sex: string
//         city: string
//         avatar: string
//     }
// }

// export interface ProfileUpdate {
//     firstName: string;
//     lastName: string;
//     phone: number | undefined;
//     address: string;
//     city: string;
//     sex: string;
//     birthDay: Date | undefined;
//     avatar: string | undefined;
//     email: string;
// }



export interface newUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    solanaPublicKey?: string; // Thêm trường này nếu cần
  }
  
  export interface User {
    email: string;
    password: string;
    solanaPublicKey?: string; // Thêm trường này nếu cần
  }
  
  export interface GetUsersQuery {
    page?: number;
    limit?: number;
    query?: string;
    color?: string;
    gender?: string;
    category?: string;
    min?: number;
    max?: number;
    sort?: string;
  }
  
  interface ListUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    admin: boolean;
    createdAt?: string;
  }
  
  interface Role {
    id: string;
    role: boolean;
  }
  
  export interface ProfileProps {
    email: string;
    firstName: string;
    lastName: string;
    profile: {
      address: string;
      birthDay: Date;
      phoneNumber: number;
      sex: string;
      city: string;
      avatar: string;
    };
  }
  
  export interface ProfileUpdate {
    email: string;
    firstName: string;
    lastName: string;
    solanaPublicKey?: string; // Thêm thuộc tính solanaPublicKey nếu cần thiết
    address?: string;
    avatar?: string;
    birthDay?: string;
    city?: string;
    phone?: number;
    sex?: string;
}

  
  export interface UserWithBlockchain extends User {
    blockchainId?: string;
  }
  