import { useState, type FormEvent } from "react";
import { Truck } from "lucide-react";

const cities = ["Mumbai", "Bengaluru", "Chennai", "Delhi NCR", "Hyderabad", "Pune", "Kolkata"];

export function DeliveryCheck() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setResult(null);
      setError("Enter a valid 6-digit pincode.");
      return;
    }
    const digits = pincode.split("").reduce((sum, d) => sum + Number(d), 0);
    const days = (digits % 4) + 2;
    const city = cities[digits % cities.length];
    setError(null);
    setResult(`Delivered to ${pincode} (${city} hub) in ${days}–${days + 1} days, with installation.`);
  };

  return (
    <form onSubmit={submit} className="border border-border bg-beige p-5">
      <p className="label-eyebrow flex items-center gap-2 text-teal">
        <Truck className="h-4 w-4" aria-hidden="true" /> Delivery check
      </p>
      <div className="mt-3 flex gap-2">
        <label htmlFor="pincode" className="sr-only">
          Pincode
        </label>
        <input
          id="pincode"
          inputMode="numeric"
          maxLength={6}
          value={pincode}
          onChange={(event) => setPincode(event.target.value.replace(/\D/g, ""))}
          placeholder="6-digit pincode"
          className="numeric w-full border border-border bg-card px-3 py-2 text-sm text-navy"
        />
        <button
          type="submit"
          className="bg-navy px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-teal"
        >
          Check
        </button>
      </div>
      {error ? <p className="mt-2 text-xs text-destructive">{error}</p> : null}
      {result ? <p className="mt-2 text-xs text-navy">{result}</p> : null}
    </form>
  );
}
