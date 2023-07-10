import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FadeLoader } from 'react-spinners'

import classes from './App.module.css';
import CourseCard from './components/course/courseCard/courseCard';
import EditCourseForm from './components/course/courseForm/editCourseForm';
import CreateCourseForm from './components/course/courseForm/createCourseForm';
import Modal from './components/modal/modal';
import { createCourse, deleteCourse, getCourses, getUsers, updateCourse } from './services/apiService';

// Unique keys for queryClient requests.
const queryKey = {
  courses: 'courses',
  users: 'users',
}

function App() {

  // The content to show in the modal.
  const [modalContent, setModalContent] = useState(null);

  const queryClient = useQueryClient();

  // Fetch courses.
  const { isLoading: isCoursesLoading, data: courses } = useQuery({
    queryKey: [queryKey.courses],
    queryFn: getCourses
  })

  // Invalidates course data and causes a refetch.
  const invalidateCourses = () => {
    queryClient.invalidateQueries({ queryKey: [queryKey.courses] })
  }

  // Fetch users.
  const { isLoading: isUsersLoading, data: users } = useQuery({
    queryKey: [queryKey.users],
    queryFn: getUsers,
  })

  // Delete a course.
  const deleteCourseMutation = useMutation({
    mutationFn: deleteCourse,
    onMutate: async (id) => {
      // Cancel any outgoing refetches, to avoid overwrites.
      await queryClient.cancelQueries({ queryKey: [queryKey.courses] })

      // Snapshot the previous value.
      const previousCourses = queryClient.getQueryData([queryKey.courses])

      // Optimistically remove course.
      queryClient.setQueryData(
        [queryKey.courses],
        (old) => old.filter(course => course._id !== id)
      );

      return { previousCourses }
    },
    onSettled: invalidateCourses,
  })

  // Create a course.
  const createCourseMutation = useMutation({
    mutationFn: createCourse,
    onSettled: () => {
      invalidateCourses();
      setModalContent(null);
    }
  })

  // Update a course.
  const updateCourseMutation = useMutation({
    mutationFn: updateCourse,
    onSettled: () => {
      invalidateCourses();
      setModalContent(null);
    }
  });

  const handleEditCourse = (course) => {
    const editCourseForm =
      <EditCourseForm
        initialCourseData={course}
        coaches={users}
        onSave={(course) => updateCourseMutation.mutate(course)}
      />

    setModalContent(editCourseForm)
  }

  const handleCreateCourse = () => {
    const newCourseData = {
      name: '', description: '', coach: users[0], members: []
    }

    const createCourseForm =
      <CreateCourseForm
        initialCourseData={newCourseData}
        coaches={users}
        onSave={(course) => createCourseMutation.mutate(course)
        }
      />

    setModalContent(createCourseForm)
  }

  // Loading spinner.
  if (isCoursesLoading || isUsersLoading) {
    return <div className={classes.loading}>
      <FadeLoader color={'white'} loading={true} />
    </div>
  }

  return (
    <div className={classes.container}>
      {
        courses.map(course =>
          <CourseCard
            key={course._id}
            course={course}
            onDelete={() => deleteCourseMutation.mutate(course._id)}
            onEdit={() => handleEditCourse(course)}
          />
        )
      }

      <button
        className={classes.createButton}
        onClick={handleCreateCourse}
      >
        Create
      </button>

      <Modal
        isOpen={modalContent !== null}
        onClose={() => {
          setModalContent(null);
        }}>
        {modalContent}
      </Modal>

    </div>
  )
}

export default App
