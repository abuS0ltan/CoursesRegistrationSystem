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
def regCount():
    regs=db(db.studentsRegs.coursed).select(db.studentsRegs.coursed)
    return locals() 

