const ErrorMsg = (Errormsg) => {
  return (
    <div className='error_message_container'>
      {Errormsg && (<p className='error_message_paragraph' > {Errormsg.ErrorMsg} </p>)}
    </div>
  );
};

export default ErrorMsg;