"use client";

// react-datepicker installed

import { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// الاستيراد الصحيح 100٪
import { ar, enUS } from "date-fns/locale";

registerLocale("ar", ar);
registerLocale("en", enUS);

export default function DashboardPage() {
  const [lang, setLang] = useState("ar");

  const [symbol, setSymbol] = useState("SPX");
  const [companyInput, setCompanyInput] = useState("");
  const [companies, setCompanies] = useState<string[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<string[]>([]);

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [fullDate, setFullDate] = useState<Date | null>(null);

  const [contractType, setContractType] = useState("CALL");
  const [entryPrice, setEntryPrice] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [notes, setNotes] = useState("");

  const [groups] = useState(["SPX TRADING", "QQQ GROUP", "TSLA GROUP"]);
  const [selectedGroup, setSelectedGroup] = useState("SPX TRADING");

  const [activeTrades, setActiveTrades] = useState<any[]>([]);
  const [closedTrades, setClosedTrades] = useState<any[]>([]);

  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("saved_companies");
    if (saved) setCompanies(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (!companyInput) {
      setFilteredCompanies([]);
      return;
    }
    const lower = companyInput.toLowerCase();
    setFilteredCompanies(
      companies.filter((c) => c.toLowerCase().startsWith(lower))
    );
  }, [companyInput, companies]);

  const addCompany = () => {
    if (!companyInput.trim()) return;
    if (!companies.includes(companyInput)) {
      const updated = [...companies, companyInput];
      setCompanies(updated);
      localStorage.setItem("saved_companies", JSON.stringify(updated));
    }
    setCompanyInput("");
  };

  const sendContract = () => {
    const contract = {
      symbol,
      company: companyInput,
      date: `${day}-${month}-${year}`,
      fullDate,
      type: contractType,
      entryPrice,
      takeProfit,
      stopLoss,
      notes,
      group: selectedGroup,
    };
    setActiveTrades([...activeTrades, contract]);
    setShowPreview(true);
  };

  const sendNote = () => {
    console.log("Note sent:", notes, "to group:", selectedGroup);
  };

  const sendImage = () => {
    if (!imageFile) return;
    console.log("Image sent to:", selectedGroup);
  };

  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6">
      <div className="mx-auto" style={{ maxWidth: "420px" }}>
        
        <h1 className="text-3xl font-bold text-center mb-4" style={{ color: "#FFD700" }}>
          SPX TRADING
        </h1>

        <div className="flex justify-end gap-2 mb-4">
          <button onClick={() => setLang("ar")} className="px-3 py-1 bg-gray-700 rounded">
            عربي
          </button>
          <button onClick={() => setLang("en")} className="px-3 py-1 bg-gray-700 rounded">
            English
          </button>
        </div>

        <div className="bg-[#111] border border-[#333] p-4 rounded-lg mb-6">

          <label className="text-[#FFD700]">الرمز</label>
          <input
            className="w-full bg-black border border-[#444] p-2 rounded mb-3"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />

          <label className="text-[#FFD700]">اسم الشركة</label>
          <input
            className="w-full bg-black border border-[#444] p-2 rounded mb-2"
            value={companyInput}
            onChange={(e) => setCompanyInput(e.target.value)}
          />

          {filteredCompanies.length > 0 && (
            <div className="bg-black border border-[#444] p-2 rounded mb-2">
              {filteredCompanies.map((c) => (
                <div
                  key={c}
                  className="p-1 hover:bg-[#222] cursor-pointer"
                  onClick={() => setCompanyInput(c)}
                >
                  {c}
                </div>
              ))}
            </div>
          )}

          <button
            className="w-full bg-purple-700 p-2 rounded mb-4"
            onClick={addCompany}
          >
            حفظ الشركة
          </button>

          <label className="text-[#FFD700]">تاريخ الانتهاء</label>
          <div className="flex gap-2 mb-3">
            <input
              placeholder="يوم"
              className="w-full bg-black border border-[#444] p-2 rounded"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
            <input
              placeholder="شهر"
              className="w-full bg-black border border-[#444] p-2 rounded"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
            <input
              placeholder="سنة"
              className="w-full bg-black border border-[#444] p-2 rounded"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          <DatePicker
            selected={fullDate}
            onChange={(date) => setFullDate(date)}
            className="w-full bg-black border border-[#444] p-2 rounded mb-3"
            placeholderText="اختر من التقويم"
            locale={lang}
          />

          <div className="bg-black border border-[#444] p-3 rounded mb-4">
            <DatePicker
              inline
              selected={fullDate}
              onChange={(date) => setFullDate(date)}
              locale={lang}
            />
          </div>

          <label className="text-[#FFD700]">نوع الخيار</label>
          <div className="flex gap-2 mb-3">
            <button
              className={`w-full p-2 rounded ${contractType === "CALL" ? "bg-green-700" : "bg-[#333]"}`}
              onClick={() => setContractType("CALL")}
            >
              شراء
            </button>
            <button
              className={`w-full p-2 rounded ${contractType === "PUT" ? "bg-red-700" : "bg-[#333]"}`}
              onClick={() => setContractType("PUT")}
            >
              بيع
            </button>
          </div>

          <label className="text-[#FFD700]">سعر الدخول</label>
          <input className="w-full bg-black border border-[#444] p-2 rounded mb-3"
            value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} />

          <label className="text-[#FFD700]">هدف الربح</label>
          <input className="w-full bg-black border border-[#444] p-2 rounded mb-3"
            value={takeProfit} onChange={(e) => setTakeProfit(e.target.value)} />

          <label className="text-[#FFD700]">إيقاف الخسارة</label>
          <input className="w-full bg-black border border-[#444] p-2 rounded mb-3"
            value={stopLoss} onChange={(e) => setStopLoss(e.target.value)} />

          <label className="text-[#FFD700]">ملاحظات</label>
          <textarea
            className="w-full bg-black border border-[#444] p-2 rounded mb-4"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <label className="text-[#FFD700]">القروب</label>
          <select
            className="w-full bg-black border border-[#444] p-2 rounded mb-4"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            {groups.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>

          <button
            className="w-full bg-yellow-600 p-2 rounded mb-2"
            onClick={sendContract}
          >
            إرسال العقد
          </button>

          <button className="w-full bg-red-700 p-2 rounded mb-4">
            تشغيل / إيقاف البوت
          </button>
        </div>

        <div className="bg-[#111] border border-[#333] p-4 rounded-lg mb-6">
          <h2 className="text-[#FFD700] mb-2">إرسال ملاحظة</h2>
          <textarea
            className="w-full bg-black border border-[#444] p-2 rounded mb-3"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <button className="w-full bg-purple-700 p-2 rounded" onClick={sendNote}>
            إرسال الملاحظة
          </button>
        </div>

        <div className="bg-[#111] border border-[#333] p-4 rounded-lg mb-6">
          <h2 className="text-[#FFD700] mb-2">إرسال صورة</h2>
          <input
            type="file"
            className="w-full bg-black border border-[#444] p-2 rounded mb-3"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
          <button className="w-full bg-blue-700 p-2 rounded" onClick={sendImage}>
            إرسال الصورة
          </button>
        </div>

        <div className="bg-[#111] border border-[#333] p-4 rounded-lg mb-6">
          <h2 className="text-[#FFD700] mb-3">الصفقات النشطة</h2>
          {activeTrades.map((t, i) => (
            <div key={i} className="border border-[#444] p-3 rounded mb-2">
              <p>رمز: {t.symbol}</p>
              <p>تاريخ: {t.date}</p>
              <p>نوع: {t.type === "CALL" ? "شراء" : "بيع"}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#111] border border-[#333] p-4 rounded-lg mb-6">
          <h2 className="text-[#FFD700] mb-3">العقود المغلقة</h2>
          {closedTrades.map((t, i) => (
            <div key={i} className="border border-[#444] p-3 rounded mb-2">
              <p>رمز: {t.symbol}</p>
              <p>نوع: {t.type}</p>
              <p>مغلق</p>
            </div>
          ))}
        </div>

        <div className="bg-[#111] border border-[#333] p-4 rounded-lg mb-6">
          <h2 className="text-[#FFD700] mb-3">التقرير</h2>
          <p className="text-gray-400">سيتم إضافة نظام التقرير بعد الربط مع البوت.</p>
        </div>

      </div>

      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center px-4">
          <div className="bg-[#111] border border-[#FFD700] p-5 rounded-lg" style={{ maxWidth: "420px", width: "100%" }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: "#FFD700" }}>
              معاينة العقد — SPX TRADING
            </h2>

            <p>رمز: {symbol}</p>
            <p>الشركة: {companyInput || "-"}</p>
            <p>تاريخ: {day}-{month}-{year}</p>
            <p>نوع: {contractType === "CALL" ? "شراء" : "بيع"}</p>
            <p>سعر الدخول: {entryPrice}</p>
            <p>هدف الربح: {takeProfit}</p>
            <p>إيقاف الخسارة: {stopLoss}</p>
            <p>ملاحظات: {notes || "-"}</p>
            <p>القروب: {selectedGroup}</p>

            <button
              className="w-full bg-red-700 p-2 rounded mt-4"
              onClick={() => setShowPreview(false)}
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
