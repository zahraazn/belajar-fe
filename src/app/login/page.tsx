"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



const registerSchema = z.object({
  username: z.string().min(1, "Username harus diisi"),
  email: z.string().email("E-mail harus diisi"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});
const loginSchema = z.object({
  email: z.string().email("E-mail tidak valid").min(1, "E-mail tidak valid"),
  password: z.string().min(8, "Password mungkin salah"),
});

export default function Register({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [tab,setTab]= useState('login');

  useEffect(() => {

    setTab('login');
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/admin/website"); 
    }
  }, []);

  const {
    register: registerForm,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const {
    register: loginForm,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitRegister = async (data: z.infer<typeof registerSchema>) => {
    try {
      const response = await axios.post("http://localhost:4000/auth/register", data);
      console.log("Registrasi berhasil");
      await onSubmitLogin({ email: data.email, password: data.password });
    } catch (error) {
      console.error("Error", error);
    }
  };

  const onSubmitLogin = async (data: z.infer<typeof loginSchema>) => {
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email: data.email,
        password: data.password,
      });
      const accessToken = response.data.Data.accessToken;
      console.log("token");
      localStorage.setItem("accessToken", accessToken);
      router.push("/admin/website");
    } catch (error) {
      console.error("Error", error);
    }
  };

 

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        
          <Tabs value={tab} onValueChange={setTab} defaultValue="account" className="w-[400px] " >
            <TabsList className="grid w-full grid-cols-2 bg-[#1f294b]" >
              <TabsTrigger value="sign" className="text-white">Register</TabsTrigger>
              <TabsTrigger value="login" className="text-white">Login</TabsTrigger>
            </TabsList>
            <TabsContent value="sign">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center ">DAFTAR</CardTitle>
                  <CardDescription className="text-center">
                    Hallo! Terima kasih telah berkunjung ke website kami. Untuk
                    pengalaman pengguna yang lebih baik, silakan daftar terlebih
                    dahulu.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleRegisterSubmit(onSubmitRegister)}>
                  <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <Input
                        id="username"
                        placeholder="Username"
                        {...registerForm("username")}
                      />
                      {registerErrors.username && (
                        <p className="text-red-600">
                          {registerErrors.username.message}
                        </p>
                      )}
                      <Input
                        id="email"
                        placeholder="E-mail"
                        {...registerForm("email")}
                      />
                      {registerErrors.email && (
                        <p className="text-red-600">
                          {registerErrors.email.message}
                        </p>
                      )}
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        {...registerForm("password")}
                      />
                      {registerErrors.password && (
                        <p className="text-red-600">
                          {registerErrors.password.message}
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center text">
                    <Button type="submit" className="font-extrabold bg-[#384058]">Save</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">LOGIN</CardTitle>
                  <CardDescription className="text-center">
                    Hallo! Terima kasih telah berkunjung ke website kami. Apakah
                    anda sudah memiliki akun? jika sudah silahkan melakukan
                    login
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleLoginSubmit(onSubmitLogin)}>
                  <CardContent>
                    <div className="grid w-full items-center gap-4">
                      <Input
                        id="emailLogin"
                        placeholder="E-mail"
                        {...loginForm("email")}
                      />
                      {loginErrors.email && (
                        <p className="text-red-600">
                          {loginErrors.email.message}
                        </p>
                      )}
                      <Input
                        id="passwordLogin"
                        type="password"
                        placeholder="PasswordLogin"
                        {...loginForm("password")}
                      />
                      {loginErrors.password && (
                        <p className="text-red-600">
                          {loginErrors.password.message}
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="submit" className="bg-[#384058]">Save</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
    </div>
  );
}