const ErrorMsg = ({ ErrorMsg }) => {
  return (
    <div className='error_message_container'>
      {ErrorMsg && (<p className='error_message_paragraph' > {ErrorMsg} </p>)}
    </div>
  );
};

export default ErrorMsg;