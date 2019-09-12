import React, { Fragment } from 'react';


function UniversitySubjectData(props) {
  return (
    <>
      <h2>{props.university}</h2>
      <h2>
        Materia:
        {' '}
        {props.subject}
      </h2>
      {props.content.map((str) => (
        <Fragment key={idContent()}>
          <h3>{str}</h3>
          <br />
        </Fragment>
      ))}

    </>

  );
}

let contentId = 0;
function idContent() {
  return contentId++;
}

export default UniversitySubjectData;
