def homePage():
    login=False
    return locals()
@auth.requires_login()
def coursesList():
    
    return locals()
@auth.requires_login()
def coursesData():
    rows=db(db.courses).select()
    return locals()
@auth.requires_login()
def schedulesData():
    rows=db(db.courseSchedules).select()
    return locals()
@auth.requires_login()
def yourCourses():
    return locals()
@auth.requires_login()
def regsData():
    rows=db(db.studentsRegs.studentId==auth.user.id).select()
    return locals()
@auth.requires_login()
def regCount():
    regs=db(db.studentsRegs.coursed).select(db.studentsRegs.coursed)
    return locals()
@auth.requires_login()
def addCourse():
    courseId = int(request.args(0))
    db.studentsRegs.insert(studentId=auth.user.id,coursed=courseId)
    msg=courseId
    redirect(URL('yourCourses'))
    return locals()
@auth.requires_login()
def news():
    return locals() 
def newsData():
    rows=db(db.news).select(orderby=~db.news.timeAndDate)
    return locals()