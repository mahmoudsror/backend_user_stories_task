export default interface ITaskHistory {
    id?:number,
    task:any,
    user?:any,
    status:string,
    action: string,
    createdAt?:Date,
    updatedAt?:Date
}