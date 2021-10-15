import React, { useState }  from 'react';
import {authFetch} from '../auth'


const NNPage = () => {
    const [pdb, setPdb] = useState({id: '', rerun: false});
 
    

    const submitProtein = e => {

        // ** Future feature**
        // if (pdbFile) { 
        //     e.preventDefault()
        //     fetch('/api/nn', {
        //         method: 'post',
        //         url:'/nn', 
        //         body: pdbFile,
        //         headers: {
        //             'content-type': 'text/csv'
        //           }
        //     })
        //     .then(r => { 
        //         if (r.status === 200) {
        //             console.log(r)
        //             alert('Running the net on your pdb file. This could take up to 15 minutes. Please check your email, and spam folder for the results. ')
        //         }
        //         else {alert('error')}
        //     })
        // }
        // else if (!pdbFile && pdbId) {
        // **
        if (pdb) {
        e.preventDefault()
        authFetch('/api/nn', {
            method: 'post',
            url:'/nn', 
            body: JSON.stringify(pdb),
            headers: {
                'content-type': 'application/json'
              }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.status === 201) {
            alert('Neural Net is running PDB file. You will recieve an email with the results within a few minutes or up to an hour. Larger proteins take longer')
            } else if (data.status === 400) {
                alert('Protein is not available from RCSB')
            } else {
                alert(data)
            }

        })
        // .then(r => { 
        //     if (r.status === 200) {
        //         console.log(r)
        //         alert('Fetching pdb from RCSB, and running the net on it. This could take up to 15 minutes. Please check your email, and spam folder for the results. ')
        //     }
        //     else {alert('error')}
        // })
    } else {
        alert('please fill form')
    }
    }


// const handleFile = e => {
//     const file = e.target.value
//     const formData = new FormData()
//     formData.append('file', file)
//     setPdbFile(formData)
// }

const handleId = e => {
    console.log(e)
    if (e.length === 4){
        setPdb({...pdb, id: e.toUpperCase()})
        console.log('4')
    } else {
        return
    }
} 

const rerunHandler = e => {
    if (e.target.checked) {
    setPdb({...pdb, rerun: true})
    } else {
        setPdb({...pdb, rerun: false})
    }
}
console.log('rr', pdb.rerun)

return (
    <div className="yes-scroll container-fluid avoid-navbar overflow-auto">
                <div className="col-sm-12 page-header overflow-auto">
                    <h1 className="dark-grey">Protein Crystal Structure Submission<small></small></h1>
                </div>
            <form onSubmit={submitProtein}>
                <div className='nnContainer container container-page'>
                    <div className="nnInput form-group col-sm-2">
                        <input 
                        className="form-control" 
                        placeholder="PDB ID"
                        onChange={e => handleId(e.target.value)}
                        minLength='4'
                        maxLength='4'
                        ></input>
                    </div>
                    <div className="checkbox mb-3">
                    <label>
                      <input type="checkbox" value="rerun" onChange={rerunHandler}/> rerun
                    </label>
                  </div>
                        {/* SAVED FOR FUTURE FEATURE
                         <label className="form-label">Upload Custom/In-house PDB:</label>
                    <div className="form-group col-sm-3">
                        <input 
                        className="form-control form-control-sm" 
                        type="file" 
                        id="formFile"
                        onChange={handleFile}>    
                        </input>
                    </div> */}
                </div>
        <section className="container">
            <hr />
            <div className="container">
                <br />
                <div className="col-md-6 text-justify">
                    <h3 className="dark-grey"><strong>Upon Submission</strong></h3>
                    <p>
                        By clicking on "Submit" you agree to the <a href="/terms">Terms and Conditions</a>.
                    </p>
                    <p>
                        The data will be emailed to you upon completion.
                    </p>
                    <p>
                        This Protein Neural Net is still an on going research project in the Ellington Research Lab
                        and may be temporarily offline for updates and the addition of new features.
                    </p>
                    <p>
                        Please visit the <a href="/FAQ">FAQ page</a> for additional details.
                    </p>
                </div>
            </div>
            <div className="col-sm-6">
                <br />
                <button type="submit" className="w-20 btn btn-lg btn-primary">Submit</button>
            </div> 
        </section>
        </form>
    </div>
)
}

export default NNPage