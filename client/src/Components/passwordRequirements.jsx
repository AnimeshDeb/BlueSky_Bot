import '../componentStyles/passwordmatch.css'
function PasswordRequirements(){
    return(

        <div className="passwordInfo">
            <p className="passwordText">Password must contain at least 10 characters, alphanumeric value,
            and a special character.</p>
          </div>
    )
}
export default PasswordRequirements