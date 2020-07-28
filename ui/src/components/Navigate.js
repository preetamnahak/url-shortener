import React, { useEffect } from 'react';
import $ from 'jquery'
import toastr from 'toastr';
import 'toastr/build/toastr.css';

export default function Navigate() {
	const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
	useEffect(() => {
		$.ajax({
          type: "GET",
          url: "/fetch-long-url/" + urlParams.get('q'),
          success : function(res){
            if(res.status === "success"){
                window.location.href=res.message;
            }
            else{
                toastr.warning(res.message, "Warning")
            }
          },
          error : function(err){
            toastr.error("Something went wrong", "Error")
          }
      })
	})
  return (
    <div>
    </div>
  );
}

