import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [rating, setRating] = useState(5);

  const faqs = [
    { q: 'Bagaimana cara kerja layanan antar jemput Netto Laundry?', a: 'Kami menyediakan layanan antar jemput untuk area tertentu. Hubungi kami untuk informasi lebih lanjut.' },
    { q: 'Berapa lama proses pencucian laundry?', a: 'Regular 2-3 hari, Express 6-8 jam, Super Express 3-4 jam.' },
    { q: 'Apakah pakaian saya akan dicampur dengan pakaian pelanggan lain?', a: 'Tidak. Setiap pakaian pelanggan diproses secara terpisah dan dilabeli.' },
    { q: 'Apakah deterjen yang digunakan aman untuk pakaian bayi?', a: 'Ya, kami menggunakan deterjen yang lembut dan aman.' },
    { q: 'Bagaimana jika pakaian saya hilang atau rusak?', a: 'Kami memberikan jaminan ganti rugi untuk setiap kerusakan.' },
  ];

  const reviews = [
    { name: 'PUTRI SAPITRA', text: 'Sangat puas melayani di Netto! Pakaian saya selalu bersih dan rapi.' },
    { name: 'YUMARIA ANNAR', text: 'Layanan Netto selalu memuaskan. Tepat waktu dan hasil cucian sangat bersih.' },
    { name: 'ULIZA ZULKARNAEN', text: 'Saya sudah jadi pelanggan Netto lebih dari setahun. Kualitas tetap konsisten.' },
    { name: 'RIAN HIDAYAT', text: 'Layanan express Netto Laundry benar-benar membantu di saat darurat.' },
  ];

  const s = {
    gradBlue: { background: 'linear-gradient(160deg, #60b3f7 0%, #3b82f6 40%, #2563eb 100%)' },
    gradBlueDark: { background: 'linear-gradient(160deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)' },
    white: { background: '#fff' },
    gray50: { background: '#f8fafc' },
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', margin: 0, padding: 0, width: '100%' }}>

      {/* NAVBAR */}
      <nav style={{ background: '#fff', boxShadow: '0 1px 6px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 100, padding: '0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
              <img src="/img/logo Netto loundry.jpeg" alt="Netto Laundry Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <span style={{ fontWeight: 800, fontSize: 20, color: '#1e293b' }}>
              <span style={{ color: '#2563eb' }}>Netto</span>Laundry
            </span>
          </div>
          <div style={{ display: 'flex', gap: 24, fontSize: 13, fontWeight: 600, color: '#475569' }}>
            <a href="#beranda" style={{ color: '#475569', textDecoration: 'none' }}>BERANDA</a>
            <a href="#tentang" style={{ color: '#475569', textDecoration: 'none' }}>TENTANG KAMI</a>
            <a href="#cara-kerja" style={{ color: '#475569', textDecoration: 'none' }}>CARA KERJA</a>
            <a href="#layanan" style={{ color: '#475569', textDecoration: 'none' }}>LAYANAN</a>
            <a href="#ulasan" style={{ color: '#475569', textDecoration: 'none' }}>ULASAN</a>
            <a href="#faq" style={{ color: '#475569', textDecoration: 'none' }}>FAQ</a>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link to="/login" style={{ fontSize: 13, fontWeight: 700, color: '#2563eb', textDecoration: 'none' }}>LOGIN</Link>
            <Link to="/register" style={{ background: '#2563eb', color: '#fff', fontSize: 13, fontWeight: 700, padding: '8px 20px', borderRadius: 999, textDecoration: 'none' }}>REGISTER</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="beranda" style={{ ...s.gradBlue, position: 'relative', overflow: 'hidden', padding: '60px 24px 80px' }}>
        {/* Bubbles */}
        {[{s:200,t:20,r:80},{s:120,t:160,r:10},{s:300,t:-60,r:220,o:0.1},{s:90,b:30,r:140},{s:60,t:60,r:380,o:0.15}].map((b,i)=>(
          <div key={i} style={{ position:'absolute', width:b.s, height:b.s, borderRadius:'50%', border:'2px solid rgba(255,255,255,0.3)', opacity: b.o||0.2, top:b.t, bottom:b.b, right:b.r, pointerEvents:'none' }} />
        ))}

        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 40, alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
          {/* Kiri */}
          <div style={{ flex: 1, color: '#fff' }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 12 }}>🏠 NETTO LAUNDRY › LAUNDRY KILOAN</p>
            <h1 style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.2, margin: '0 0 16px', color: '#fff' }}>
              Laundry Cepat, Bersih,<br />dan Terpercaya!
            </h1>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, maxWidth: 480, marginBottom: 32 }}>
              Saatnya menikmati pakaian bersih tanpa repot! Kami mengelola pakaian Anda secara higienis, cepat, dan siap pakai. Nikmati kemudahan melacak status real-time dan laporan order lengkap.
            </p>
            <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
              <button style={{ background: '#fff', color: '#2563eb', fontWeight: 700, padding: '10px 24px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: 14 }}>Pelajari Layanan →</button>
              <button style={{ background: 'transparent', color: '#fff', fontWeight: 700, padding: '10px 24px', borderRadius: 999, border: '2px solid rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: 14 }}>Lihat Paket Harga</button>
            </div>
            <div style={{ display: 'flex', gap: 28 }}>
              {[['⚡','Proses Cepat','Express dalam hitungan jam'],['💎','Harga Terjangkau','Mulai Rp 8.000/kg'],['✅','Anti Ketukar','Sistem pelabelan canggih']].map(([icon,title,desc],i)=>(
                <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                  <span style={{ fontSize: 24 }}>{icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: '#fff' }}>{title}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kanan - Order Card */}
          <div style={{ width: 300, flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
              <span style={{ background: '#10b981', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 999 }}>Express 6 Jam</span>
            </div>
            <div style={{ background: '#fff', borderRadius: 20, padding: 20, boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: '#1e293b' }}>Pelacakan Cucian</span>
                <span style={{ color: '#2563eb', fontSize: 12, cursor: 'pointer' }}>Lihat Status</span>
              </div>
              <div style={{ background: '#eff6ff', borderRadius: 14, padding: '14px', marginBottom: 12 }}>
                <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:10 }}>
                  <div style={{ width:40, height:40, background:'#bfdbfe', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>🧺</div>
                  <div style={{ flex:1, fontWeight:600, fontSize:13, color:'#1e293b' }}>Paket Suasta</div>
                  <span style={{ background:'#fef9c3', color:'#b45309', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999 }}>Diproses</span>
                </div>
                <div style={{ fontSize:12, color:'#475569', lineHeight:2 }}>
                  <div>🟢 Silahkan A</div>
                  <div>🔵 Status A Pickup</div>
                  <div>🕐 Hari Rabu</div>
                </div>
              </div>
              <div style={{ textAlign:'right', fontSize:12, color:'#64748b', marginBottom:12 }}>Total: Rp 112.000 (7kg)</div>
              <button style={{ width:'100%', background:'#2563eb', color:'#fff', fontWeight:700, padding:'10px', borderRadius:12, border:'none', cursor:'pointer', fontSize:13 }}>
                Lacak Orderan
              </button>
            </div>
            <p style={{ color:'rgba(255,255,255,0.7)', fontSize:12, textAlign:'center', marginTop:10 }}>✓ 2 Ribu+ Klien</p>
          </div>
        </div>
      </section>

      {/* TENTANG KAMI */}
      <section id="tentang" style={{ background: '#f8fafc', padding: '60px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <p style={{ color:'#2563eb', fontWeight:700, fontSize:13, marginBottom:8 }}>TENTANG KAMI</p>
            <h2 style={{ fontSize:32, fontWeight:800, color:'#0f172a', margin:'0 0 12px' }}>Kenali Lebih Dekat Netto Laundry</h2>
            <p style={{ color:'#64748b', fontSize:14, maxWidth:560, margin:'0 auto' }}>Kami mengedepankan kualitas layanan terbaik untuk pakaian Anda. Dengan peralatan modern dan tenaga profesional terpercaya.</p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, marginBottom:40 }}>
            {[
              ['🏠','Sistem Laundry Modern','Netto Laundry menghadirkan pencucian dengan mesin berstandar tinggi. Pakaian dicuci sempurna dengan teknologi terkini.'],
              ['⚡','Layanan Kilat','Memiliki rencana mendadak? Kami punya layanan kilat yang dapat mengembalikan pakaian secepat mungkin.'],
              ['👍','Terjamin Layanan','Tim berpengalaman menangani setiap kebutuhan dengan responsif. Komitmen kepuasan pelanggan dengan hasil presisi.']
            ].map(([icon,title,desc],i)=>(
              <div key={i} style={{ background:'#fff', borderRadius:16, padding:28, textAlign:'center', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
                <div style={{ width:56, height:56, borderRadius:'50%', background:['#dbeafe','#dcfce7','#ede9fe'][i], display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, margin:'0 auto 16px' }}>{icon}</div>
                <h3 style={{ fontSize:16, fontWeight:700, color:'#0f172a', margin:'0 0 8px' }}>{title}</h3>
                <p style={{ fontSize:13, color:'#64748b', lineHeight:1.6 }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Lokasi */}
          <div style={{ background:'#fff', borderRadius:20, boxShadow:'0 2px 12px rgba(0,0,0,0.06)', display:'grid', gridTemplateColumns:'1fr 1fr', overflow:'hidden' }}>
            <div style={{ padding:32 }}>
              <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:12 }}>
                <div style={{ width:48, height:48, background:'#fee2e2', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>📍</div>
                <div>
                  <div style={{ fontWeight:700, color:'#0f172a' }}>Lokasi Usaha Kami</div>
                  <div style={{ fontSize:12, color:'#64748b' }}>Netto Express Laundry | KIDB</div>
                </div>
              </div>
              <p style={{ fontSize:13, color:'#475569', lineHeight:1.7 }}>Jl. Sepakat No.98, Sukamaju Selatan, Kec. Balikpapan Barat, Kota Balikpapan, Kalimantan Timur 76131</p>
            </div>
            <div style={{ background:'#e2e8f0', display:'flex', alignItems:'center', justifyContent:'center', minHeight:200, fontSize:48 }}>🗺️</div>
          </div>
        </div>
      </section>

      {/* CARA KERJA */}
      <section id="cara-kerja" style={{ ...s.gradBlue, padding:'60px 24px', position:'relative', overflow:'hidden' }}>
        {[{s:180,t:20,l:-40},{s:120,b:30,l:60},{s:220,t:-50,r:100,o:0.1}].map((b,i)=>(
          <div key={i} style={{ position:'absolute', width:b.s, height:b.s, borderRadius:'50%', border:'2px solid rgba(255,255,255,0.3)', opacity:b.o||0.2, top:b.t, bottom:b.b, left:b.l, right:b.r, pointerEvents:'none' }} />
        ))}
        <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <p style={{ color:'rgba(255,255,255,0.8)', fontWeight:700, fontSize:13, marginBottom:8 }}>CARA KERJA</p>
            <h2 style={{ fontSize:32, fontWeight:800, color:'#fff', margin:'0 0 12px' }}>Bagaimana Cara Kerja Netto Laundry?</h2>
            <p style={{ color:'rgba(255,255,255,0.8)', fontSize:14, maxWidth:560, margin:'0 auto' }}>Proses kerja layanan berjalan mudah! Tidak perlu repot, cukup beberapa langkah dan pakaian Anda beres.</p>
          </div>

          <div style={{ display:'flex', justifyContent:'center', gap:16, flexWrap:'wrap' }}>
            {[['1️⃣','Daftar'],['2️⃣','Pilih Paket'],['3️⃣','Antar/Jemput'],['4️⃣','Proses Cuci'],['5️⃣','Quality Check'],['6️⃣','Setrika & Pack'],['7️⃣','Delivery'],['8️⃣','Selesai']].map(([icon,label],i)=>(
              <div key={i} style={{ background:'#fff', borderRadius:'50%', width:90, height:90, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 16px rgba(0,0,0,0.15)', gap:4 }}>
                <span style={{ fontSize:28 }}>{icon}</span>
                <span style={{ fontSize:11, fontWeight:600, color:'#1e293b', textAlign:'center', lineHeight:1.2 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LAYANAN */}
      <section id="layanan" style={{ background:'#fff', padding:'60px 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <p style={{ color:'#2563eb', fontWeight:700, fontSize:13, marginBottom:8 }}>DAFTAR LAYANAN</p>
            <h2 style={{ fontSize:32, fontWeight:800, color:'#0f172a', margin:'0 0 12px' }}>Layanan Laundry Terbaik Sesuai Kebutuhan Anda</h2>
            <p style={{ color:'#64748b', fontSize:14, maxWidth:560, margin:'0 auto' }}>Pilih paket layanan laundry terbaik kami dengan harga bersaing dan kualitas terjamin.</p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginBottom:20 }}>
            {[
              {badge:'BEST SELLER',badgeColor:'#1d4ed8',badgeBg:'#dbeafe',name:'Cuci Kiloan (Regular)',price:'Rp 8.000',unit:'/kg',desc:'Layanan cuci kering dengan waktu standar 2-3 hari. Cocok untuk cuci rutin harian.',btnStyle:{background:'#2563eb',color:'#fff'}},
              {badge:'SANGAT DIMINATI',badgeColor:'#166534',badgeBg:'#dcfce7',name:'Setrika Saja',price:'Rp 5.000',unit:'/kg',desc:'Hanya layanan setrika untuk pakaian yang sudah bersih. Rapi dan siap pakai.',btnStyle:{background:'transparent',color:'#374151',border:'2px solid #d1d5db'}},
              {badge:'PREMIUM',badgeColor:'#1d4ed8',badgeBg:'#dbeafe',name:'Layanan Express (6 Jam)',price:'Rp 15.000',unit:'/kg',desc:'Layanan kilat siap dalam 6-8 jam. Cocok untuk kebutuhan mendesak.',btnStyle:{background:'#2563eb',color:'#fff'}},
            ].map((item,i)=>(
              <div key={i} style={{ background:'#eff6ff', border:'2px solid #bfdbfe', borderRadius:20, padding:24 }}>
                <span style={{ background:item.badgeBg, color:item.badgeColor, fontSize:11, fontWeight:700, padding:'4px 12px', borderRadius:999, display:'inline-block', marginBottom:12 }}>{item.badge}</span>
                <h3 style={{ fontSize:16, fontWeight:700, color:'#0f172a', margin:'0 0 6px' }}>{item.name}</h3>
                <div style={{ fontSize:28, fontWeight:800, color:'#2563eb', marginBottom:4 }}>{item.price} <span style={{ fontSize:14, color:'#64748b' }}>{item.unit}</span></div>
                <p style={{ fontSize:12, color:'#475569', marginBottom:20, lineHeight:1.6 }}>{item.desc}</p>
                <button style={{ width:'100%', padding:'10px', borderRadius:12, fontWeight:700, fontSize:13, cursor:'pointer', border:'none', ...item.btnStyle }}>Pesan →</button>
              </div>
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
            {[
              {badge:'HARI SELESAI (8 JAM)',name:'Layanan Express (6 Jam)',price:'Rp 15.000',unit:'/kg',desc:'Cuci kilat dalam 6 jam dengan prioritas penanganan dan hasil sempurna.',icon:'⚡'},
              {badge:'PREMIUM',name:'Cool Drying (Dry Clean)',price:'Rp 12.000',unit:'/item',desc:'Perawatan khusus untuk pakaian berbahan sensitif, jas, kebaya, dan gaun pesta.',icon:'✨'},
            ].map((item,i)=>(
              <div key={i} style={{ background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:16, padding:20, display:'flex', gap:16 }}>
                <div style={{ width:48, height:48, background:'#dbeafe', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, flexShrink:0 }}>{item.icon}</div>
                <div style={{ flex:1 }}>
                  <span style={{ background:'#dbeafe', color:'#1d4ed8', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999, display:'inline-block', marginBottom:8 }}>{item.badge}</span>
                  <h3 style={{ fontSize:15, fontWeight:700, color:'#0f172a', margin:'0 0 4px' }}>{item.name}</h3>
                  <div style={{ fontSize:24, fontWeight:800, color:'#2563eb', marginBottom:6 }}>{item.price} <span style={{ fontSize:13, color:'#64748b' }}>{item.unit}</span></div>
                  <p style={{ fontSize:12, color:'#475569', marginBottom:12, lineHeight:1.6 }}>{item.desc}</p>
                  <button style={{ background:'#2563eb', color:'#fff', fontWeight:700, padding:'8px 20px', borderRadius:10, border:'none', cursor:'pointer', fontSize:12 }}>Pesan →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ULASAN */}
      <section id="ulasan" style={{ ...s.gradBlueDark, padding:'60px 24px', position:'relative', overflow:'hidden' }}>
        {[{s:200,t:10,l:-50},{s:150,b:20,r:-40},{s:240,t:-60,r:200,o:0.1}].map((b,i)=>(
          <div key={i} style={{ position:'absolute', width:b.s, height:b.s, borderRadius:'50%', border:'2px solid rgba(255,255,255,0.3)', opacity:b.o||0.2, top:b.t, bottom:b.b, left:b.l, right:b.r, pointerEvents:'none' }} />
        ))}
        <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ textAlign:'center', marginBottom:32 }}>
            <p style={{ color:'rgba(255,255,255,0.8)', fontWeight:700, fontSize:13, marginBottom:8 }}>ULASAN HANGAT PELANGGAN</p>
            <h2 style={{ fontSize:32, fontWeight:800, color:'#fff', margin:'0 0 12px' }}>Ulasan Hangat Pelanggan Netto</h2>
            <p style={{ color:'rgba(255,255,255,0.8)', fontSize:14 }}>Pelajari seluruh ulasan pelanggan Netto di sini untuk membantu pelanggan lainnya.</p>
          </div>

          <div style={{ background:'rgba(255,255,255,0.1)', backdropFilter:'blur(20px)', borderRadius:20, padding:24, marginBottom:32 }}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:16 }}>
              {reviews.map((r,i)=>(
                <div key={i} style={{ background:'#fff', borderRadius:14, padding:16, boxShadow:'0 2px 12px rgba(0,0,0,0.1)' }}>
                  <div style={{ display:'flex', gap:2, marginBottom:8 }}>
                    {[...Array(5)].map((_,j)=>(
                      <span key={j} style={{ color:'#facc15', fontSize:14 }}>★</span>
                    ))}
                  </div>
                  <p style={{ fontWeight:700, fontSize:12, color:'#0f172a', marginBottom:4 }}>{r.name}</p>
                  <p style={{ fontSize:11, color:'#475569', lineHeight:1.6, marginBottom:8 }}>{r.text}</p>
                  <p style={{ fontSize:10, color:'#2563eb', fontWeight:600 }}>NETTO LAUNDRY</p>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'rgba(255,255,255,0.7)' }}>
              <span>PARA PEMBERI NETTO</span>
              <span>Total {reviews.length} Ulasan</span>
            </div>
          </div>

          {/* Form Ulasan */}
          <div style={{ background:'#fff', borderRadius:20, padding:24, maxWidth:720, margin:'0 auto' }}>
            <p style={{ fontSize:12, color:'#64748b', marginBottom:16 }}>✍ TULIS ULASAN ANDA</p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
              <div>
                <label style={{ display:'block', fontSize:12, fontWeight:700, color:'#0f172a', marginBottom:6 }}>NAMA:</label>
                <input type="text" placeholder="Nama Lengkap" style={{ width:'100%', border:'1px solid #e2e8f0', borderRadius:10, padding:'8px 12px', fontSize:13, outline:'none' }} />
              </div>
              <div>
                <label style={{ display:'block', fontSize:12, fontWeight:700, color:'#0f172a', marginBottom:6 }}>RATING:</label>
                <div style={{ display:'flex', gap:4 }}>
                  {[1,2,3,4,5].map(s=>(
                    <button key={s} onClick={()=>setRating(s)} style={{ background:'transparent', border:'none', cursor:'pointer', fontSize:20, color: s<=rating?'#facc15':'#d1d5db' }}>★</button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ marginBottom:16 }}>
              <label style={{ display:'block', fontSize:12, fontWeight:700, color:'#0f172a', marginBottom:6 }}>KOMENTAR ULASAN:</label>
              <textarea rows="3" placeholder="Tulis Ulasan Anda tentang pelayanan kami di sini..." style={{ width:'100%', border:'1px solid #e2e8f0', borderRadius:10, padding:'8px 12px', fontSize:13, outline:'none', resize:'none', fontFamily:'inherit' }}></textarea>
            </div>
            <button style={{ width:'100%', background:'linear-gradient(90deg, #3b82f6, #2563eb)', color:'#fff', fontWeight:700, padding:'12px', borderRadius:12, border:'none', cursor:'pointer', fontSize:14 }}>TEMPEL ULASAN 📌</button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ background:'#f8fafc', padding:'60px 24px' }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <p style={{ color:'#2563eb', fontWeight:700, fontSize:13, marginBottom:8 }}>FAQ</p>
            <h2 style={{ fontSize:32, fontWeight:800, color:'#0f172a', margin:'0 0 12px' }}>Pertanyaan yang Sering Diajukan</h2>
            <p style={{ color:'#64748b', fontSize:14 }}>Temukan jawaban cepat atas pertanyaan-pertanyaan yang sering ditanyakan mengenai layanan kami.</p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            {faqs.map((faq,i)=>(
              <div key={i} style={{ background:'#fff', borderRadius:14, boxShadow:'0 2px 8px rgba(0,0,0,0.06)', overflow:'hidden' }}>
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 20px', background:'transparent', border:'none', textAlign:'left', cursor:'pointer', fontFamily:'inherit' }}>
                  <span style={{ fontSize:13, fontWeight:600, color:'#1e293b', flex:1 }}>{faq.q}</span>
                  <span style={{ fontSize:18, color:'#64748b', marginLeft:8 }}>{openFaq===i?'−':'+'}</span>
                </button>
                {openFaq===i && (
                  <div style={{ padding:'0 20px 16px', fontSize:13, color:'#475569', lineHeight:1.7 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ ...s.gradBlue, padding:'48px 24px 24px', position:'relative', overflow:'hidden' }}>
        {[{s:180,t:-50,r:100},{s:120,b:10,l:80}].map((b,i)=>(
          <div key={i} style={{ position:'absolute', width:b.s, height:b.s, borderRadius:'50%', border:'2px solid rgba(255,255,255,0.3)', opacity:0.2, top:b.t, bottom:b.b, left:b.l, right:b.r, pointerEvents:'none' }} />
        ))}
        <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ textAlign:'center', marginBottom:32 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginBottom:8 }}>
              <div style={{ width:40, height:40, borderRadius:10, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', flexShrink:0 }}>
                <img src="/img/logo Netto loundry.jpeg" alt="Netto" style={{ width:'100%', height:'100%', objectFit:'contain' }} />
              </div>
              <span style={{ color:'#fff', fontWeight:800, fontSize:24 }}>
                <span style={{ color:'#bfdbfe' }}>Netto</span>Laundry
              </span>
            </div>
            <p style={{ color:'rgba(255,255,255,0.8)', fontSize:13, fontWeight:600 }}>LAUNDRY CEPAT, BERSIH, DAN TERPERCAYA</p>
          </div>

          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:24, fontSize:13, fontWeight:600, color:'rgba(255,255,255,0.9)', marginBottom:24 }}>
            {['BERANDA','TENTANG KAMI','CARA KERJA','LAYANAN','ULASAN','FAQ'].map((link,i)=>(
              <a key={i} href={`#${link.toLowerCase().replace(/ /g,'-')}`} style={{ color:'rgba(255,255,255,0.9)', textDecoration:'none' }}>{link}</a>
            ))}
          </div>

          <div style={{ display:'flex', justifyContent:'center', gap:12, marginBottom:24 }}>
            {['📷','👍','🐦'].map((icon,i)=>(
              <a key={i} href="#" style={{ width:36, height:36, background:'rgba(255,255,255,0.2)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none', fontSize:18 }}>{icon}</a>
            ))}
          </div>

          <div style={{ borderTop:'1px solid rgba(255,255,255,0.2)', paddingTop:20, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12, fontSize:12, color:'rgba(255,255,255,0.7)' }}>
            <span>© 2024 Netto Laundry | Hak Cipta Dilindungi Undang-Undang</span>
            <div style={{ display:'flex', gap:16 }}>
              <a href="#" style={{ color:'rgba(255,255,255,0.7)', textDecoration:'none' }}>Syarat & Ketentuan</a>
              <a href="#" style={{ color:'rgba(255,255,255,0.7)', textDecoration:'none' }}>Kebijakan Privasi</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
