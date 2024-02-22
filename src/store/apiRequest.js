// import axios from "axios";



// export const createStudentRegistration = async (postBody)=> {
//     try {
//         let res = await axios.post("http://localhost:8000/api/v1/reg-student", postBody);
//         if(res.status === 200) {
//             return true;
//         }
//             else {
//                 return false;
//             }
//     }   
//     catch (e) {
//         return false;
//     }
// };




//   export async function allRegistedStudent(){
//     try {
//         let res= await fetch("http://localhost:8000/api/v1/all-student");
//         let JSONData=await res.json();
//         return JSONData['data'];
//     }catch (e) {
//         return []
//     }   
// }

// export const deleteStudent = async (id)=> {
//     try {
//         let res = await fetch("http://localhost:8000/api/v1/delete-student/"+id)
//         let JSONData = await res.json();
//         if(JSONData['status']==='success') {
//             return true;
//         } else {
//             return false;
//         }
//     }
//     catch (e) {
//         return false;
//     }
// } 

// // export const getById = async (id)=> {
// //     try {
// //         let res = await fetch("http://localhost:8000/api/v1/get-by-id/"+id)
// //         let JSONData = await res.json();
// //         return JSONData['data'][0];
// //     }
// //     catch (e) {
// //         return []
// //     }
// // }

// export async function getById(id){
//     try {
//         let res=await fetch("http://localhost:8000/api/v1/get-by-id/"+id);
//         let JSONData=await res.json();
//         return JSONData['data'][0];
//     }catch (e) {
//         return []
//     }
// }
  

// export const updateStudenInformation = async (postBody, id)=> {
//     try {
//         let result = await axios.post("http://localhost:8000/api/v1/update-student/"+id, postBody);
//         if(result.status === 200) {
//             return true;
//         } else {
//             return false;
//         }
//     }
//     catch (e) {
//         return  false
//     }
// }