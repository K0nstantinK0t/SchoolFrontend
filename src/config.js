export default {
    APIHost: 'http//api.school.local',
    classesURL: 'http://api.school.local/api/schoolclasses',
    studentsURL: 'http://api.school.local/api/students',
    teachersURL: 'http://api.school.local/api/teachers',
    logOutURL: 'http://api.school.local/api/logout',
    authURL: 'http://api.school.local/api/token',
    createStudentURL: 'http://api.school.local/api/students',
    removeStudent: (id)=>{
        return 'http://api.school.local/api/students/'+id+'/remove'
    },
    setClassTeacherURL: (classID)=>{
        return 'http://api.school.local/api/schoolclasses/'+classID+'/setTeacher'
    },
    youngestStudentURL: 'http://api.school.local/api/students/youngest'
}