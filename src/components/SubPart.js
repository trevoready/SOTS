import React from 'react'
import { useParams } from 'react-router-dom';

export default function SubPart() {
    const {id} = useParams();
  return (
    <div>SubPart{ id }</div>
  )
}
