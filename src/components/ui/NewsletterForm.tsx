"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";


export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // 'success' | 'error' | 'loading'
  const [message, setMessage] = useState("");

    const { dict } = useTranslation();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });


    const data = await res.json();
     console.log(data)


    if (res.ok) {
      setStatus("success");
      setMessage("You have successfully subscribed!🎉 check your email to conform");
      setEmail("");
      // console.log("Subscription successful:", data);
    } else {
      setStatus("error");
      setMessage(data.error || "Something went wrong.");
    }
  };

  return (
    <Form className="newsletter-form">
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Control
                            type="email"
                            placeholder={(dict.footer["your-email"])}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="email-field"
                          />
                        </Form.Group>
    
                        <Button
                          variant="primary"
                          type="submit"
                          className="newsletterSubmitBtn"
                          onClick={handleSubmit} disabled={status === "loading"}
                        >
                          {(dict.footer["subscribe"])}
                        </Button>
                       { message != "" ? <p className={`mt-2 newsletter-message ${status === "success" ? "text-success" : "text-danger"}`}>
                            {message}
                                         </p> : ""
                      } 
                        
    </Form>
  );
}