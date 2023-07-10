import classes from './courseCard.module.css';

const CourseCard = ({ course, onDelete, onEdit }) => (
    <div className={classes.container}>
        <div>
            <h1 className={classes.name}>{course.name}</h1>

            <p className={classes.description}>{course.description}</p>

            {
                course.coach &&
                <div>
                    <label>Coach</label>
                    <div className={classes.members}>
                        <span>{course.coach.name}</span>
                    </div>
                </div>
            }

            {
                !!course.members?.length &&
                <div>
                    <label>Members</label>
                    <div className={classes.members}>
                        {
                            course.members.map((member, index) =>
                                <span key={course._id}>
                                    {member.name}
                                    {index !== course.members.length - 1 && ', '}
                                </span>
                            )
                        }
                    </div>
                </div>
            }
        </div>

        <div className={classes.buttons}>
            <button className={classes.deleteButton} onClick={() => onDelete?.()}>
                Delete
            </button>
            
            <button onClick={() => onEdit?.()}>
                Edit
            </button>
        </div>
        
    </div>
)


export default CourseCard