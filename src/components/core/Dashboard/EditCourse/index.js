import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps';
import { useEffect } from 'react';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';

export default function EditCourse(){

    const dispatch=useDispatch();
    const {courseId}=useParams();
    const {course}=useSelector((state)=>state.course);
    const [loading, setLoading]=useState(false);
    const {token}=useSelector((state)=>state.auth);

    useEffect(()=>{
        const populateCourseDetails=async()=>{
            setLoading(true);
            const result=await getFullDetailsOfCourse(courseId, token);
            if(result?.courseDetails){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
            }
            setLoading(false);
        }
        populateCourseDetails();
    }, [])

    if(loading){
        return (
            <div>
                Loading ...
            </div>
        )
    }

  return (
    <div className='text-white'>
      <h1>Edit Course</h1>
      <div>
        {
            course?(<RenderSteps/>):(<p>Course Not Found</p>)
        }
      </div>
    </div>
  )
}