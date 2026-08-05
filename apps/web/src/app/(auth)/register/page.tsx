"use client";

import { useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserRole } from "@raiquet/core";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.BUYER);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Error al registrarse");
      }

      const data = await res.json();
      login(data.user);
      
      if (data.user.role === UserRole.SELLER) {
        router.push("/seller");
      } else {
        router.push("/buyer");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-teal-deep mb-6 text-center">Registro</h1>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-teal-dark mb-1">Nombre</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-teal-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-primary bg-white text-teal-deep"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-teal-dark mb-1">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-teal-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-primary bg-white text-teal-deep"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-teal-dark mb-1">Contraseña</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-2 border border-teal-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-primary bg-white text-teal-deep"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-teal-dark mb-1">¿Qué quieres hacer?</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="w-full px-4 py-2 border border-teal-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-primary bg-white text-teal-deep"
          >
            <option value={UserRole.BUYER}>Quiero comprar</option>
            <option value={UserRole.SELLER}>Quiero vender</option>
            <option value={UserRole.RIDER}>Quiero hacer envíos</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-teal-primary text-white py-2 rounded-lg font-medium hover:bg-teal-dark transition-colors disabled:opacity-70 mt-4"
        >
          {loading ? "Cargando..." : "Crear cuenta"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-teal-dark">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="text-amber font-semibold hover:underline">
          Inicia sesión
        </Link>
      </div>
    </div>
  );
}
