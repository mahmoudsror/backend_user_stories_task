export default interface ITask {
    id?:number,
    title:string,
    description:string,
    status:string,
    createdBy?:number,
    assignee?:number,
    createdAt?:Date,
    updatedAt?:Date
}