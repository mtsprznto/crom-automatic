"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatearFechaIso } from "@/lib/utils/formatear_fecha";
import Link from "next/link";
import { useEffect, useState } from "react";

type Course = {
  id: string;
  name: string;
  links_courses: string;
  updateTime: string;
};

type CursosResponse =
  | { cursos: Course[] }
  | { status: "oauth_required"; auth_url: string; message: string };

export const CardCoursesView = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const urlApiObtenerId =
    "https://bot-cami-classroom.vercel.app/obtener_ids_cursos";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(urlApiObtenerId);
        const data: CursosResponse = await res.json();

        if ("cursos" in data) {
          setCourses(data.cursos);
        } else if (data.status === "oauth_required") {
          setAuthUrl(data.auth_url);
          setMessage(data.message);
        }
      } catch (err) {
        setMessage("Error al cargar cursos");
        console.error("Error al obtener cursos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [urlApiObtenerId]);

  return (
    <div className="md:px-6 md:py-3 w-full md:max-w-[1000px] mx-auto md:px-0 ">
      {loading ? (
        <p className="text-center text-muted-foreground">Cargando cursos...</p>
      ) : authUrl ? (
        <div className="text-center space-y-4">
          <Link
            href={authUrl}
            className="inline-block px-4 py-2 text-sm font-medium text-white bg-eggplant-950 rounded hover:rounded-[10px] hover:bg-eggplant-500 transition duration-300"
          >
            Conectar con Google Classroom
          </Link>
        </div>
      ) : error ? (
        <p className="text-center text-destructive">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.name}</CardTitle>
                <CardDescription className="text-[10px]">
                  Fecha de actualización: {formatearFechaIso(course.updateTime)}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-full">
                <div className="flex items-center justify-start gap-1">
                  <p className="text-sm text-muted-foreground">ID:</p>
                  <p className="text-sm text-muted-foreground">{course.id}</p>
                </div>
              </CardContent>
              <CardFooter>
                {/* Link de classroom google */}
                <Link
                  href={course.links_courses}
                  className="p-0 py-0"
                  target="_blank"
                >
                  <Button className="text-[10px] px-2 py-0 bg-eggplant-950 hover:bg-eggplant-500 transition duration-300 cursor-pointer">
                    Ver curso
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
