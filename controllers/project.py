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
@auth.requires_login()
def newsData():
    rows=db(db.news).select(orderby=~db.news.timeAndDate)
    return locals()
@auth.requires_login()
def StudentProfile():
    coursesCount=db(db.studentsRegs.studentId==auth.user.id).count()
    return locals()
@auth.requires_login()
def deleteCourse():
    regId = int(request.args(0))
    db(db.studentsRegs.id==regId).delete()
    msg=regId
    redirect(URL('yourCourses'))
    return locals()
@auth.requires_login()
@auth.requires_membership('admin')
def controlPanal():
    return locals()