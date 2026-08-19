/* ==========================================================================
   YÖKAK Program Akreditasyonu Ölçütleri — Öz Değerlendirme Raporu veri seti
   YÖKAK Programme Accreditation Criteria — Self-Assessment Report dataset
   --------------------------------------------------------------------------
   Kaynak / Source: "Program Akreditasyonu Ölçütleri" çalışma dosyası.
   9 ana ölçüt · 57 alt ölçüt · 179 indikatör.

   Alt ölçütlerden bazıları programın niteliğine bağlıdır (staj, uygulamalı
   eğitim, ilk kez dış değerlendirme). Bunlar `optional: true` taşır ve
   uyum ölçeğinde "Uygulanamaz" seçeneği yalnızca bu alt ölçütlerde açılır.

   Some sub-criteria depend on the nature of the programme (internship,
   practical training, first external review). These carry `optional: true`
   and only for them does the compliance scale offer "Not applicable".

   İçerik güncellenecekse SADECE bu dosya düzenlenir; form şeması (schema.js)
   adımları buradan üretir. / To update the content edit ONLY this file; the
   form schema generates its steps from here.
   ========================================================================== */

window.SAR = (function () {
  "use strict";

  /* --------------------------------------------------------------------
     Uyum ölçeği / compliance scale
     Üç düzeyli değerlendirme; "Uygulanamaz" yalnızca koşullu (optional)
     alt ölçütlerde seçilebilir.
     -------------------------------------------------------------------- */
  var complianceScale = [
    {
      value: "compatible",
      tone: "success",
      score: 1,
      label: { tr: "Uygun", en: "Compatible" },
      desc: {
        tr: "Alt ölçütün gerekleri tanımlı, uygulanmakta ve kanıtlarla gösterilmektedir.",
        en: "The requirements of the sub-criterion are defined, implemented and demonstrated with evidence.",
      },
    },
    {
      value: "partial",
      tone: "warning",
      score: 0.5,
      label: { tr: "Kısmen Uygun", en: "Partially Compatible" },
      desc: {
        tr: "Gerekler kısmen karşılanmaktadır; uygulama veya kanıt bakımından eksikler bulunmaktadır.",
        en: "The requirements are partly met; there are gaps in implementation or in evidence.",
      },
    },
    {
      value: "non",
      tone: "danger",
      score: 0,
      label: { tr: "Uygun Değil", en: "Non-Compatible" },
      desc: {
        tr: "Alt ölçütün gerekleri karşılanmamaktadır.",
        en: "The requirements of the sub-criterion are not met.",
      },
    },
    {
      value: "na",
      tone: "muted",
      score: null,
      optionalOnly: true,
      label: { tr: "Uygulanamaz", en: "Not Applicable" },
      desc: {
        tr: "Alt ölçüt programın niteliği gereği uygulanmamaktadır; gerekçesi belirtilmelidir.",
        en: "The sub-criterion does not apply given the nature of the programme; a justification must be given.",
      },
    },
  ];

  /* --------------------------------------------------------------------
     Ana ölçütler → alt ölçütler → indikatörler
     Main criteria → sub-criteria → indicators
     -------------------------------------------------------------------- */
  var criteria = [
    {
      no: 1,
      code: "1",
      title: { tr: "Kalite Güvencesi Politikası ve Yönetişim", en: "Quality Assurance Policy and Governance" },
      subs: [
        {
          code: "1.1",
          text: {
            tr: "Programın kalite güvencesi süreçleri kurumun stratejik karar alma ve yönetişim mekanizmalarıyla ilişkilendirilmiştir.",
            en: "The quality assurance processes of the programme are linked to the institution's strategic decision-making and governance mechanisms.",
          },
          rubric: "A.1.1",
          rubrics: ["A.1.1", "A.1.4", "A.2.2", "B.1.6"],
          indicators: [
            {
              tr: "Programın kalite güvencesi süreçleri, misyon ve vizyonu, kurum kalite politikası, stratejik planı ve eğitim-öğretim politikası ile ilişkilendirilmiştir.",
              en: "The quality assurance processes of the programme are linked to its mission and vision, the institutional quality policy, the strategic plan and the education and training policy.",
            },
            {
              tr: "Program düzeyindeki kalite güvencesi süreçlerinin, kurumun ilgili akademik ve idari karar alma mekanizmalarıyla bağlantısı açıktır.",
              en: "The connection between programme-level quality assurance processes and the institution's relevant academic and administrative decision-making mechanisms is clear.",
            },
          ],
          evidence: {
            tr: "Kurum kalite politikası, stratejik plan, eğitim-öğretim politikası, program kalite süreci, süreç şemaları, kurul/komisyon kararları, görev ve sorumluluk tanımları, program kalite güvencesi iş akışları",
            en: "Institutional quality policy, strategic plan, education and training policy, programme quality process, process diagrams, board/committee decisions, definitions of duties and responsibilities, programme quality assurance workflows",
          },
          suggestions: {
            tr: ["Kurum kalite politikası", "Stratejik plan", "Eğitim-öğretim politikası", "Program kalite süreci", "Süreç şemaları", "Kurul/komisyon kararları", "Görev ve sorumluluk tanımları", "Program kalite güvencesi iş akışları"],
            en: ["Institutional quality policy", "Strategic plan", "Education and training policy", "Programme quality process", "Process diagrams", "Board/committee decisions", "Definitions of duties and responsibilities", "Programme quality assurance workflows"],
          },
        },
        {
          code: "1.2",
          text: {
            tr: "Program düzeyinde görev, yetki ve sorumluluklar tanımlıdır.",
            en: "Duties, authorities and responsibilities are defined at programme level.",
          },
          rubric: "A.1.1",
          rubrics: ["A.1.1", "A.3.4", "B.1.6"],
          indicators: [
            {
              tr: "Bölüm başkanı, bölüm/program kurulu, program kalite sorumluları, komisyonlar, danışmanlar ve varsa destek birimlerinin görev, yetki ve sorumlulukları yazılı olarak tanımlanmıştır.",
              en: "The duties, authorities and responsibilities of the head of department, the department/programme board, programme quality officers, committees, advisors and support units where applicable are defined in writing.",
            },
            {
              tr: "Program kalite güvencesi süreçlerinde karar alma, uygulama ve raporlama sorumlulukları açık biçimde belirlenmiştir.",
              en: "Responsibilities for decision-making, implementation and reporting in the programme's quality assurance processes are clearly established.",
            },
            {
              tr: "Program düzeyindeki komisyon, kurul ve sorumlu kişilerin kurum kalite güvencesi yapılarıyla ilişkisi tanımlıdır.",
              en: "The relationship of programme-level committees, boards and responsible persons with the institution's quality assurance structures is defined.",
            },
          ],
          evidence: {
            tr: "Görev tanımları, organizasyon şeması, komisyon listeleri, komisyon yönergeleri, çalışma usul ve esasları, görevlendirme yazıları, toplantı tutanakları, karar kayıtları, iş akışları, kalite güvencesi görev dağılım belgeleri",
            en: "Job descriptions, organisation chart, committee lists, committee directives, working principles and procedures, appointment letters, meeting minutes, decision records, workflows, quality assurance task allocation documents",
          },
          suggestions: {
            tr: ["Görev tanımları", "Organizasyon şeması", "Komisyon listeleri", "Komisyon yönergeleri", "Çalışma usul ve esasları", "Görevlendirme yazıları", "Toplantı tutanakları", "Karar kayıtları", "Iş akışları", "Kalite güvencesi görev dağılım belgeleri"],
            en: ["Job descriptions", "Organisation chart", "Committee lists", "Committee directives", "Working principles and procedures", "Appointment letters", "Meeting minutes", "Decision records", "Workflows", "Quality assurance task allocation documents"],
          },
        },
        {
          code: "1.3",
          text: {
            tr: "Öğrenciler, mezunlar, öğretim elemanları, işverenler ve ilgili dış paydaşlar kalite güvencesi ve karar süreçlerine sistematik ve etkili bir şekilde katılır.",
            en: "Students, graduates, teaching staff, employers and relevant external stakeholders participate systematically and effectively in quality assurance and decision-making processes.",
          },
          rubric: "A.4.1",
          rubrics: ["A.4.1", "A.4.2", "A.4.3", "B.1.5"],
          indicators: [
            {
              tr: "Programın iç ve dış paydaşları tanımlanmış; paydaşların hangi süreçlere, hangi sıklıkta ve hangi yöntemlerle katılacağı belirlenmiştir.",
              en: "The internal and external stakeholders of the programme are identified; which processes stakeholders will take part in, how often and by which methods is established.",
            },
            {
              tr: "Öğrenciler program kalite güvencesi süreçlerinde temsil edilir, karar alma süreçlerine etkili biçimde katılır.",
              en: "Students are represented in the programme's quality assurance processes and participate effectively in decision-making processes.",
            },
            {
              tr: "Mezunlar, işverenler, meslek örgütleri ve ilgili dış paydaşlar programın kalite güvencesi süreçlerine etkisi görülebilir biçimde dahil edilir.",
              en: "Graduates, employers, professional bodies and relevant external stakeholders are involved in the programme's quality assurance processes in a visible manner.",
            },
            {
              tr: "Paydaş katılım mekanizmalarının program kararlarıyla ilişkisi açıkça kurulmuştur ve uygulanmaktadır.",
              en: "The relationship between stakeholder participation mechanisms and programme decisions is clearly established and applied.",
            },
          ],
          evidence: {
            tr: "Paydaş analizi, paydaş katılım planı, danışma kurulu yapısı, öğrenci temsilciliği kayıtları, paydaş toplantı gündemleri ve tutanakları, mezun ve işveren katılım kayıtları, program kurulu/danışma kurulu kararları",
            en: "Stakeholder analysis, stakeholder engagement plan, advisory board structure, student representation records, stakeholder meeting agendas and minutes, graduate and employer participation records, programme board/advisory board decisions",
          },
          suggestions: {
            tr: ["Paydaş analizi", "Paydaş katılım planı", "Danışma kurulu yapısı", "Öğrenci temsilciliği kayıtları", "Paydaş toplantı gündemleri ve tutanakları", "Mezun ve işveren katılım kayıtları", "Program kurulu/danışma kurulu kararları"],
            en: ["Stakeholder analysis", "Stakeholder engagement plan", "Advisory board structure", "Student representation records", "Stakeholder meeting agendas and minutes", "Graduate and employer participation records", "Programme board/advisory board decisions"],
          },
        },
        {
          code: "1.4",
          text: {
            tr: "Program kalite güvencesi süreçlerinin sonuçları ilgili paydaşlarla paylaşılır.",
            en: "The results of the programme's quality assurance processes are shared with relevant stakeholders.",
          },
          rubric: "A.1.5",
          rubrics: ["A.1.5", "A.4.1", "B.1.5"],
          indicators: [
            {
              tr: "Program kalite güvencesi süreçlerinden elde edilen temel sonuçların hangi paydaşlarla, hangi kanallar aracılığıyla ve hangi düzeyde paylaşılacağı tanımlanmıştır.",
              en: "It is defined with which stakeholders, through which channels and at what level the key results obtained from the programme's quality assurance processes will be shared.",
            },
            {
              tr: "Program değerlendirme sonuçları, alınan kararlar ve kalite güvencesi kapsamındaki temel çıktılar ilgili iç paydaşlarla paylaşılmaktadır.",
              en: "Programme evaluation results, decisions taken and key outputs within the scope of quality assurance are shared with the relevant internal stakeholders.",
            },
            {
              tr: "Öğrenciler ve ilgili dış paydaşlar, program kalite güvencesi süreçlerinin kendilerini ilgilendiren sonuçları hakkında bilgilendirilmektedir.",
              en: "Students and relevant external stakeholders are informed about the results of the programme's quality assurance processes that concern them.",
            },
          ],
          evidence: {
            tr: "Web sayfası duyuruları, kalite raporları, program değerlendirme özetleri, toplantı sunumları ve raporları, öğrenci/mezun/paydaş bilgilendirmeleri, e-posta veya duyuru kayıtları, program kurulu/danışma kurulu paylaşım kayıtları",
            en: "Website announcements, quality reports, programme evaluation summaries, meeting presentations and reports, information provided to students/graduates/stakeholders, e-mail or announcement records, programme board/advisory board sharing records",
          },
          suggestions: {
            tr: ["Web sayfası duyuruları", "Kalite raporları", "Program değerlendirme özetleri", "Toplantı sunumları ve raporları", "Öğrenci/mezun/paydaş bilgilendirmeleri", "E-posta veya duyuru kayıtları", "Program kurulu/danışma kurulu paylaşım kayıtları"],
            en: ["Website announcements", "Quality reports", "Programme evaluation summaries", "Meeting presentations and reports", "Information provided to students/graduates/stakeholders", "E-mail or announcement records", "Programme board/advisory board sharing records"],
          },
        },
        {
          code: "1.5",
          text: {
            tr: "Programda akademik özgürlük, akademik dürüstlük, kamu sorumluluğu, ayrımcılıkla mücadele ve sosyal kapsayıcılık ilkeleri gözetilir.",
            en: "The principles of academic freedom, academic integrity, public responsibility, combating discrimination and social inclusion are observed in the programme.",
          },
          rubric: "",
          rubrics: ["A.2.1", "B.3.4", "D.1.1"],
          indicators: [
            {
              tr: "Programda akademik özgürlük, akademik dürüstlük ve etik ilkeler, kapsayıcılık, ayrımcılıkla mücadele, kamu sorumluluğu ve erişilebilirlik gözetilir ve akademik karar alma ve eğitim-öğretim süreçlerine entegre edilir.",
              en: "Academic freedom, academic integrity and ethical principles, inclusiveness, combating discrimination, public responsibility and accessibility are observed in the programme and integrated into academic decision-making and educational processes.",
            },
            {
              tr: "Akademik dürüstlük, etik davranış ve sorumluluk, kapsayıcılık ve ayrımcılıkla mücadele konularında öğrenci ve personel farkındalığını destekleyen uygulamalar, (kural, rehber ve yaptırım mekanizmaları) mevcuttur ve ilan edilmiştir.",
              en: "Practices supporting student and staff awareness of academic integrity, ethical conduct and responsibility, inclusiveness and combating discrimination (rules, guides and sanction mechanisms) exist and have been announced.",
            },
            {
              tr: "Program, akademik dürüstlük ve etik politikasını; üretken yapay zeka araçlarının öğrenme, öğretme, ölçme-değerlendirme ve öğrenci çalışmalarındaki kullanımını kapsayacak biçimde tanımlar. Bu kullanımın sorumlu, insan-merkezli ve insan denetimini/doğrulamasını güvence altına alan mekanizmalara sahiptir.",
              en: "The programme defines its academic integrity and ethics policy so as to cover the use of generative artificial intelligence tools in learning, teaching, assessment and student work. It has mechanisms that ensure this use is responsible, human-centred and subject to human oversight and verification.",
            },
          ],
          evidence: {
            tr: "Etik kurallar, yapay zeka politikası, akademik dürüstlük politikası, akademik özgürlük ve kamu sorumluluğuna ilişkin düzenlemeler, engelli öğrenci ve erişilebilirlik düzenlemeleri, kapsayıcılık uygulamaları, şikâyet/itiraz mekanizmaları, intihal ve etik ihlal süreçleri, eğitim ve farkındalık faaliyetleri",
            en: "Code of ethics, artificial intelligence policy, academic integrity policy, regulations on academic freedom and public responsibility, arrangements for students with disabilities and accessibility, inclusion practices, complaint/appeal mechanisms, plagiarism and ethical breach procedures, training and awareness activities",
          },
          suggestions: {
            tr: ["Etik kurallar", "Yapay zeka politikası", "Akademik dürüstlük politikası", "Akademik özgürlük ve kamu sorumluluğuna ilişkin düzenlemeler", "Engelli öğrenci ve erişilebilirlik düzenlemeleri", "Kapsayıcılık uygulamaları", "Şikâyet/itiraz mekanizmaları", "Intihal ve etik ihlal süreçleri", "Eğitim ve farkındalık faaliyetleri"],
            en: ["Code of ethics", "Artificial intelligence policy", "Academic integrity policy", "Regulations on academic freedom and public responsibility", "Arrangements for students with disabilities and accessibility", "Inclusion practices", "Complaint/appeal mechanisms", "Plagiarism and ethical breach procedures", "Training and awareness activities"],
          },
        },
        {
          code: "1.6",
          text: {
            tr: "Program kapsamındaki staj, işyeri eğitimi, uygulamalı eğitim ve benzeri öğrenme ortamları kalite güvencesi kapsamındadır.",
            en: "Internships, workplace training, practical training and similar learning environments within the scope of the programme are covered by quality assurance.",
          },
          optional: true,
          scopeNote: {
            tr: "Bu alt ölçüt staj ve uygulamalı eğitimin olduğu programlar için geçerlidir.",
            en: "This sub-criterion applies to programmes that include internships and practical training.",
          },
          rubric: "B.1.4",
          rubrics: ["B.1.3", "B.1.6", "B.3.1", "B.3.3"],
          indicators: [
            {
              tr: "Program kapsamında yürütülen staj, işyeri eğitimi, klinik uygulama, okul deneyimi, mesleki uygulama, saha çalışması, laboratuvar/atölye uygulaması, kurum/işletme temelli eğitim ve benzeri program dışı öğrenme ortamlarının kalite güvencesi kapsamı tanımlanmıştır.",
              en: "The quality assurance scope of internships, workplace training, clinical practice, school experience, professional practice, fieldwork, laboratory/workshop practice, institution/enterprise-based training and similar learning environments outside the programme is defined.",
            },
            {
              tr: "Bu faaliyetlerin program amaçları, program öğrenme çıktıları, ders/uygulama kazanımları, öğrenci iş yükü ve ölçme-değerlendirme süreçleriyle ilişkisi açıkça kurulmuştur.",
              en: "The relationship of these activities with programme aims, programme learning outcomes, course/practice outcomes, student workload and assessment processes is clearly established.",
            },
            {
              tr: "Uygulama yapılan kurum, işletme, okul, klinik, laboratuvar, atölye veya saha ortamlarında öğrencinin, programın, kurum dışı paydaşın, uygulama sorumlusunun ve varsa dış eğiticinin görev, sorumluluk ve iletişim kanalları açıkça belirlenmiştir.",
              en: "In the institutions, enterprises, schools, clinics, laboratories, workshops or field settings where practice takes place, the duties, responsibilities and communication channels of the student, the programme, the external stakeholder, the practice supervisor and any external trainer are clearly established.",
            },
          ],
          evidence: {
            tr: "Staj/uygulama yönergeleri, işyeri/saha eğitimi usul ve esasları, uygulama protokolleri, iş birliği sözleşmeleri, uygulama yeri listeleri, uygulama sorumlusu/dış eğitici görevlendirme kayıtları, öğrenci bilgilendirme dokümanları, uygulama planları, uygulama değerlendirme formları, öğrenci devam ve başarı kayıtları, uygulama raporları",
            en: "Internship/practice directives, principles and procedures for workplace/field training, practice protocols, cooperation agreements, lists of practice sites, practice supervisor/external trainer appointment records, student information documents, practice plans, practice assessment forms, student attendance and achievement records, practice reports",
          },
          suggestions: {
            tr: ["Staj/uygulama yönergeleri", "Işyeri/saha eğitimi usul ve esasları", "Uygulama protokolleri", "Iş birliği sözleşmeleri", "Uygulama yeri listeleri", "Uygulama sorumlusu/dış eğitici görevlendirme kayıtları", "Öğrenci bilgilendirme dokümanları", "Uygulama planları", "Uygulama değerlendirme formları", "Öğrenci devam ve başarı kayıtları", "Uygulama raporları"],
            en: ["Internship/practice directives", "Principles and procedures for workplace/field training", "Practice protocols", "Cooperation agreements", "Lists of practice sites", "Practice supervisor/external trainer appointment records", "Student information documents", "Practice plans", "Practice assessment forms", "Student attendance and achievement records", "Practice reports"],
          },
        },
      ],
    },
    {
      no: 2,
      code: "2",
      title: { tr: "Programın Tasarımı, Onayı, İzlenmesi ve Güncellenmesi", en: "Design, Approval, Monitoring and Updating of the Programme" },
      subs: [
        {
          code: "2.1",
          text: {
            tr: "Program amaçları, mezun profili ve program öğrenme çıktıları açıkça tanımlanmıştır.",
            en: "Programme aims, graduate profile and programme learning outcomes are clearly defined.",
          },
          rubric: "B.1.1",
          rubrics: ["A.2.1", "B.1.1", "B.1.3"],
          indicators: [
            {
              tr: "Programın genel amaçları ve mezun profili; programın misyonu, düzeyi, öğrenme çıktıları ve kapsamıyla uyumlu biçimde tanımlanmıştır.",
              en: "The general aims of the programme and the graduate profile are defined consistently with the programme's mission, level, learning outcomes and scope.",
            },
            {
              tr: "Program öğrenme çıktıları; öğrencilerin mezuniyet aşamasında kazanması beklenen bilgi, beceri ve yetkinlikleri açık, ölçülebilir ve değerlendirilebilir biçimde tanımlamaktadır.",
              en: "Programme learning outcomes define the knowledge, skills and competences students are expected to acquire upon graduation in a clear, measurable and assessable manner.",
            },
          ],
          evidence: {
            tr: "Program amaçları, mezun profili, program öğrenme çıktıları, program tanıtım dokümanları, ders bilgi paketleri, bölüm/program kurulu kararları, program tasarım dosyası",
            en: "Programme aims, graduate profile, programme learning outcomes, programme information documents, course information packages, department/programme board decisions, programme design file",
          },
          suggestions: {
            tr: ["Program amaçları", "Mezun profili", "Program öğrenme çıktıları", "Program tanıtım dokümanları", "Ders bilgi paketleri", "Bölüm/program kurulu kararları", "Program tasarım dosyası"],
            en: ["Programme aims", "Graduate profile", "Programme learning outcomes", "Programme information documents", "Course information packages", "Department/programme board decisions", "Programme design file"],
          },
        },
        {
          code: "2.2",
          text: {
            tr: "Programın yeterlilikleri ilgili ulusal ve uluslararası yeterlilik çerçeveleriyle ilişkilendirilmiştir.",
            en: "The qualifications of the programme are related to the relevant national and international qualifications frameworks.",
          },
          rubric: "B.1.1",
          rubrics: ["B.1.1", "B.1.3", "B.2.4"],
          indicators: [
            {
              tr: "Program öğrenme çıktıları, Türkiye Yeterlilikler Çerçevesi (TYÇ), Avrupa Yeterlilikler Çerçevesi (AYÇ) ve ilgili yükseköğretim yeterlilik düzeyi ile uyumludur.",
              en: "Programme learning outcomes are consistent with the Turkish Qualifications Framework (TQF), the European Qualifications Framework (EQF) and the relevant higher education qualification level.",
            },
            {
              tr: "Programın kazandırdığı yeterlilikler, ilgili diploma düzeyi ve varsa mesleki/alan standartları ve çekirdek eğitim programlarıyla ilişkilendirilmiştir.",
              en: "The qualifications awarded by the programme are related to the relevant degree level and, where applicable, to professional/field standards and core curricula.",
            },
            {
              tr: "Program yeterlilikleri; mezunların akademik gelişimlerini sürdürebilmelerini, mesleklerini yetkin bir şekilde icra edebilmelerini ve istihdam edilebilirliklerini destekleyecek bilgi, beceri ve yetkinlikleri kazandıracak biçimde tanımlanmıştır.",
              en: "Programme qualifications are defined so as to provide the knowledge, skills and competences that support graduates in continuing their academic development, practising their profession competently and enhancing their employability.",
            },
          ],
          evidence: {
            tr: "TYÇ uyum matrisi, program yeterlilikleri matrisi, alan yeterlilikleri eşleştirmesi, ulusal/uluslararası mesleki standartlar, çekirdek eğitim programları, akreditasyon veya meslek standardı referansları",
            en: "TQF alignment matrix, programme qualifications matrix, field qualifications mapping, national/international professional standards, core curricula, accreditation or professional standard references",
          },
          suggestions: {
            tr: ["TYÇ uyum matrisi", "Program yeterlilikleri matrisi", "Alan yeterlilikleri eşleştirmesi", "Ulusal/uluslararası mesleki standartlar", "Çekirdek eğitim programları", "Akreditasyon veya meslek standardı referansları"],
            en: ["TQF alignment matrix", "Programme qualifications matrix", "Field qualifications mapping", "National/international professional standards", "Core curricula", "Accreditation or professional standard references"],
          },
        },
        {
          code: "2.3",
          text: {
            tr: "Dersler, öğrenme çıktıları, öğrenci iş yükü ve ölçme-değerlendirme yapısı program bütünlüğünü destekler.",
            en: "Courses, learning outcomes, student workload and the assessment structure support the coherence of the programme.",
          },
          rubric: "B.1.6",
          rubrics: ["B.1.2", "B.1.3", "B.1.4", "B.2.2"],
          indicators: [
            {
              tr: "Ders öğrenme çıktıları ile program öğrenme çıktıları arasında sistematik ilişki kurulmuştur.",
              en: "A systematic relationship is established between course learning outcomes and programme learning outcomes.",
            },
            {
              tr: "Programın ders yapısı, zorunlu/seçmeli ders dengesi ve uygulama bileşenleri program amaçlarını destekleyecek şekilde düzenlenmiştir.",
              en: "The course structure of the programme, the balance of compulsory/elective courses and practical components are organised so as to support the programme's aims.",
            },
            {
              tr: "Programda dersler, ön koşullar ve kademeli ilerleme mantığı dikkate alınarak yapılandırılmıştır.",
              en: "Courses in the programme are structured taking prerequisites and a logic of progressive advancement into account.",
            },
            {
              tr: "Öğrenci iş yükü ve AKTS kredileri, derslerin öğrenme çıktıları ve program öğrenme çıktılarını desteklekleyecek şekilde belirlenmiştir.",
              en: "Student workload and ECTS credits are determined so as to support the learning outcomes of the courses and the programme learning outcomes.",
            },
            {
              tr: "Ölçme-değerlendirme yöntemleri, ders ve program öğrenme çıktılarının kazanımını gösterecek biçimde yapılandırılmıştır.",
              en: "Assessment methods are structured so as to demonstrate the achievement of course and programme learning outcomes.",
            },
          ],
          evidence: {
            tr: "Ders-program çıktıları matrisi, ders bilgi paketleri, AKTS iş yükü tabloları, ölçme-değerlendirme yöntemleri, ders izlenceleri, uygulama/staj kazanımları, müfredat haritası",
            en: "Course-programme outcomes matrix, course information packages, ECTS workload tables, assessment methods, course syllabi, practice/internship outcomes, curriculum map",
          },
          suggestions: {
            tr: ["Ders-program çıktıları matrisi", "Ders bilgi paketleri", "AKTS iş yükü tabloları", "Ölçme-değerlendirme yöntemleri", "Ders izlenceleri", "Uygulama/staj kazanımları", "Müfredat haritası"],
            en: ["Course-programme outcomes matrix", "Course information packages", "ECTS workload tables", "Assessment methods", "Course syllabi", "Practice/internship outcomes", "Curriculum map"],
          },
        },
        {
          code: "2.4",
          text: {
            tr: "Program tasarımı güncel, akademik, mesleki, toplumsal ve sektörel gelişmelerle ilişkilidir.",
            en: "The design of the programme is up to date and related to academic, professional, societal and sectoral developments.",
          },
          rubric: "B.1.1",
          rubrics: ["A.1.3", "A.4.1", "B.1.1", "B.1.5"],
          indicators: [
            {
              tr: "Program içeriği ilgili disiplinin güncel akademik ve bilimsel gelişmeleriyle uyumludur.",
              en: "The content of the programme is consistent with current academic and scientific developments in the relevant discipline.",
            },
            {
              tr: "Program tasarımında mesleki uygulama alanlarındaki gelişmeler, teknolojik dönüşüm ve sektörel beklentiler dikkate alınmaktadır.",
              en: "Developments in professional practice areas, technological transformation and sectoral expectations are taken into account in the design of the programme.",
            },
            {
              tr: "Program; toplumun ihtiyaçları, mezun istihdamı ve öğrencilerin kişisel/mesleki gelişimiyle ilişkilendirilmiştir.",
              en: "The programme is related to the needs of society, graduate employment and the personal/professional development of students.",
            },
            {
              tr: "Programın amaçları, müfredatı, öğrenme çıktıları, ders yapısı, öğrenci iş yükü veya uygulama bileşenleri ulusal ve/veya uluslararası benzer programlarla karşılaştırılarak konumlandırılmıştır.",
              en: "The aims, curriculum, learning outcomes, course structure, student workload or practical components of the programme are positioned by comparison with similar national and/or international programmes.",
            },
            {
              tr: "Programın niteliğine uygun olarak araştırma temelli öğrenme, uygulamalı öğrenme ve/veya mesleki deneyim kazandırmaya yönelik öğrenme etkinliklerine yer verilmiştir.",
              en: "In line with the nature of the programme, learning activities aimed at research-based learning, practical learning and/or gaining professional experience are included.",
            },
          ],
          evidence: {
            tr: "Müfredat güncelleme dosyaları, alan tarama raporları, sektör/meslek analizi, danışma kurulu görüşleri, dış uzman raporları, iş gücü piyasası verileri, ulusal/uluslararası referans belgeleri, ulusal/uluslararası benzer program kıyaslama/karşılaştırma raporları",
            en: "Curriculum update files, field scanning reports, sector/profession analyses, advisory board opinions, external expert reports, labour market data, national/international reference documents, benchmarking/comparison reports for similar national/international programmes",
          },
          suggestions: {
            tr: ["Müfredat güncelleme dosyaları", "Alan tarama raporları", "Sektör/meslek analizi", "Danışma kurulu görüşleri", "Dış uzman raporları", "Iş gücü piyasası verileri", "Ulusal/uluslararası referans belgeleri", "Ulusal/uluslararası benzer program kıyaslama/karşılaştırma raporları"],
            en: ["Curriculum update files", "Field scanning reports", "Sector/profession analyses", "Advisory board opinions", "External expert reports", "Labour market data", "National/international reference documents", "Benchmarking/comparison reports for similar national/international programmes"],
          },
        },
        {
          code: "2.5",
          text: {
            tr: "Program tasarımı, onayı ve gözden geçirilmesi süreçlerine öğrenciler ve ilgili paydaşlar etkili biçimde katılır.",
            en: "Students and relevant stakeholders participate effectively in the design, approval and review processes of the programme.",
          },
          rubric: "B.1.5",
          rubrics: ["A.4.1", "A.4.2", "A.4.3", "B.1.1", "B.1.5"],
          indicators: [
            {
              tr: "Öğrenciler program tasarımı, onayı, gözden geçirilmesi ve güncellenmesi süreçlerine planlı ve sistematik biçimde dahil edilmektedir.",
              en: "Students are involved in the programme's design, approval, review and update processes in a planned and systematic manner.",
            },
            {
              tr: "Mezunlar, işverenler, meslek örgütleri, dış uzmanlar ve ilgili diğer paydaşların görüşleri program tasarım ve güncelleme süreçlerinde dikkate alınmaktadır.",
              en: "The opinions of graduates, employers, professional bodies, external experts and other relevant stakeholders are taken into account in programme design and update processes.",
            },
            {
              tr: "Paydaş katkılarının program amaçları, öğrenme çıktıları, ders yapısı veya uygulama bileşenleriyle ilişkisi kurulmuştur.",
              en: "The relationship of stakeholder contributions with programme aims, learning outcomes, course structure or practical components is established.",
            },
          ],
          evidence: {
            tr: "Öğrenci geri bildirimleri, öğrenci temsilcisi kayıtları, danışma kurulu tutanakları, mezun ve işveren görüşleri, dış uzman değerlendirmeleri, paydaş toplantı tutanakları, müfredat çalıştayı kayıtları, program güncelleme kararları",
            en: "Student feedback, student representative records, advisory board minutes, graduate and employer opinions, external expert evaluations, stakeholder meeting minutes, curriculum workshop records, programme update decisions",
          },
          suggestions: {
            tr: ["Öğrenci geri bildirimleri", "Öğrenci temsilcisi kayıtları", "Danışma kurulu tutanakları", "Mezun ve işveren görüşleri", "Dış uzman değerlendirmeleri", "Paydaş toplantı tutanakları", "Müfredat çalıştayı kayıtları", "Program güncelleme kararları"],
            en: ["Student feedback", "Student representative records", "Advisory board minutes", "Graduate and employer opinions", "External expert evaluations", "Stakeholder meeting minutes", "Curriculum workshop records", "Programme update decisions"],
          },
        },
        {
          code: "2.6",
          text: {
            tr: "Programın tasarım, onay ve güncelleme süreçleri tanımlı ve kurumsal karar mekanizmalarıyla güvence altındadır.",
            en: "The design, approval and update processes of the programme are defined and assured by institutional decision-making mechanisms.",
          },
          rubric: "B.1.6",
          rubrics: ["A.3.4", "B.1.1", "B.1.5", "B.1.6"],
          indicators: [
            {
              tr: "Program açma, tasarlama, müfredat oluşturma, ders ekleme/çıkarma ve program güncelleme süreçleri tanımlıdır.",
              en: "The processes for opening and designing a programme, creating a curriculum, adding/removing courses and updating the programme are defined.",
            },
            {
              tr: "Program tasarımı ve güncellemeleri ilgili akademik kurullar ve yetkili karar mekanizmaları tarafından onaylanmaktadır.",
              en: "Programme design and updates are approved by the relevant academic boards and authorised decision-making mechanisms.",
            },
            {
              tr: "Güncellenen program amaçları, öğrenme çıktıları, müfredat ve ders bilgi paketleri ilgili paydaşların erişimine sunulmaktadır",
              en: "Updated programme aims, learning outcomes, curriculum and course information packages are made available to relevant stakeholders.",
            },
          ],
          evidence: {
            tr: "Program açma/onay dosyaları, senato/fakülte/yüksekokul/bölüm kararları, müfredat değişiklik formları, süreç akışları, komisyon kararları, güncel ders bilgi paketleri, yayımlanmış program bilgileri",
            en: "Programme opening/approval files, senate/faculty/school/department decisions, curriculum change forms, process flows, committee decisions, current course information packages, published programme information",
          },
          suggestions: {
            tr: ["Program açma/onay dosyaları", "Senato/fakülte/yüksekokul/bölüm kararları", "Müfredat değişiklik formları", "Süreç akışları", "Komisyon kararları", "Güncel ders bilgi paketleri", "Yayımlanmış program bilgileri"],
            en: ["Programme opening/approval files", "Senate/faculty/school/department decisions", "Curriculum change forms", "Process flows", "Committee decisions", "Current course information packages", "Published programme information"],
          },
        },
        {
          code: "2.7",
          text: {
            tr: "Programın güncelliği ve amacına uygunluğu periyodik olarak gözden geçirilir.",
            en: "The currency and fitness for purpose of the programme are reviewed periodically.",
          },
          rubric: "B.1.5",
          rubrics: ["A.2.3", "B.1.5", "B.1.6"],
          indicators: [
            {
              tr: "Programın içeriği, öğrenme çıktıları, öğrenci iş yükü, öğrenci ilerlemesi, mezuniyet durumu ve öğrenme ortamıyla uyumu belirli aralıklarla gözden geçirilmektedir.",
              en: "The content of the programme, learning outcomes, student workload, student progression, graduation status and alignment with the learning environment are reviewed at defined intervals.",
            },
            {
              tr: "Gözden geçirme süreci programın öğrencilerin, toplumun ve iş gücü piyasasının değişen ihtiyaçlarına cevap verme düzeyini ele almaktadır.",
              en: "The review process addresses the extent to which the programme responds to the changing needs of students, society and the labour market.",
            },
            {
              tr: "Programın güncelliği ve rekabetçiliği, ulusal ve/veya uluslararası benzer programlarla yapılan karşılaştırmalar dikkate alınarak değerlendirilmektedir.",
              en: "The currency and competitiveness of the programme are evaluated taking into account comparisons made with similar national and/or international programmes.",
            },
          ],
          evidence: {
            tr: "Periyodik program gözden geçirme raporları, program değerlendirme toplantı tutanakları, müfredat değerlendirme formları, öğrenci iş yükü değerlendirmeleri, mezuniyet/ilerleme özetleri, ders değerlendirme sonuçları, güncelleme kararları, benchmarking raporları, benzer program karşılaştırma tabloları",
            en: "Periodic programme review reports, programme evaluation meeting minutes, curriculum evaluation forms, student workload evaluations, graduation/progression summaries, course evaluation results, update decisions, benchmarking reports, comparison tables for similar programmes",
          },
          suggestions: {
            tr: ["Periyodik program gözden geçirme raporları", "Program değerlendirme toplantı tutanakları", "Müfredat değerlendirme formları", "Öğrenci iş yükü değerlendirmeleri", "Mezuniyet/ilerleme özetleri", "Ders değerlendirme sonuçları", "Güncelleme kararları", "Benchmarking raporları", "Benzer program karşılaştırma tabloları"],
            en: ["Periodic programme review reports", "Programme evaluation meeting minutes", "Curriculum evaluation forms", "Student workload evaluations", "Graduation/progression summaries", "Course evaluation results", "Update decisions", "Benchmarking reports", "Comparison tables for similar programmes"],
          },
        },
      ],
    },
    {
      no: 3,
      code: "3",
      title: { tr: "Öğrenci Merkezli Öğrenme, Öğretme ve Ölçme-Değerlendirme", en: "Student-Centred Learning, Teaching and Assessment" },
      subs: [
        {
          code: "3.1",
          text: {
            tr: "Program, öğrencilerin öğrenme sürecinde aktif rol almalarını destekler.",
            en: "The programme supports students in taking an active role in the learning process.",
          },
          rubric: "B.2.1",
          rubrics: ["B.2.1", "B.3.2", "B.3.4"],
          indicators: [
            {
              tr: "Programda kullanılan öğretim yöntem ve teknikleri öğrencilerin derse aktif katılımını, öz değerlendirmesini ve öğrenme sorumluluğunu destekleyecek şekilde yapılandırılmıştır.",
              en: "The teaching methods and techniques used in the programme are structured so as to support students' active participation in class, self-assessment and responsibility for their own learning.",
            },
            {
              tr: "Derslerde öğrencilerin tartışma, uygulama, problem çözme, araştırma, proje geliştirme, sunum yapma veya benzeri etkinliklerle öğrenme sürecine katılımı sağlanmaktadır.",
              en: "Students' participation in the learning process through discussion, practice, problem solving, research, project development, presentation or similar activities is ensured in courses.",
            },
            {
              tr: "Öğrenme etkinlikleri, program ve ders öğrenme çıktılarının kazanımını destekleyecek biçimde tasarlanmıştır.",
              en: "Learning activities are designed so as to support the achievement of programme and course learning outcomes.",
            },
          ],
          evidence: {
            tr: "Ders izlenceleri, ders bilgi paketleri, aktif öğrenme uygulamaları, proje/ödev/sunum örnekleri, uygulama çalışmaları, öğrenci katılımına ilişkin ders materyalleri, öğrenme etkinliği örnekleri",
            en: "Course syllabi, course information packages, active learning practices, project/assignment/presentation samples, practical work, course materials relating to student participation, examples of learning activities",
          },
          suggestions: {
            tr: ["Ders izlenceleri", "Ders bilgi paketleri", "Aktif öğrenme uygulamaları", "Proje/ödev/sunum örnekleri", "Uygulama çalışmaları", "Öğrenci katılımına ilişkin ders materyalleri", "Öğrenme etkinliği örnekleri"],
            en: ["Course syllabi", "Course information packages", "Active learning practices", "Project/assignment/presentation samples", "Practical work", "Course materials relating to student participation", "Examples of learning activities"],
          },
        },
        {
          code: "3.2",
          text: {
            tr: "Program, öğrenci çeşitliliğini ve farklı öğrenme ihtiyaçlarını dikkate alır.",
            en: "The programme takes student diversity and different learning needs into account.",
          },
          rubric: "B.2.1",
          rubrics: ["B.1.3", "B.2.1"],
          indicators: [
            {
              tr: "Programda farklı öğrenci profilleri, öğrenme gereksinimleri ve öğrenme hızları dikkate alınmaktadır.",
              en: "Different student profiles, learning needs and learning paces are taken into account in the programme.",
            },
            {
              tr: "Öğrencilerin öğrenme sürecine erişimini ve katılımını destekleyen esnek öğrenme olanakları ve/veya uygun destek mekanizmaları bulunmaktadır.",
              en: "Flexible learning opportunities and/or appropriate support mechanisms that support students' access to and participation in the learning process are in place.",
            },
            {
              tr: "Dezavantajlı gruplar, çalışan öğrenciler ve uluslararası öğrenciler için uygun düzenlemeler yapılmaktadır.",
              en: "Appropriate arrangements are made for disadvantaged groups, working students and international students.",
            },
          ],
          evidence: {
            tr: "Esnek öğrenme düzenlemeleri, danışmanlık kayıtları, engelli öğrenci düzenlemeleri, uzaktan/harmanlanmış öğretim uygulamaları, telafi/mazeret uygulamaları, öğrenci destek ve yönlendirme kayıtları",
            en: "Flexible learning arrangements, advising records, arrangements for students with disabilities, distance/blended teaching practices, make-up/excuse arrangements, student support and guidance records",
          },
          suggestions: {
            tr: ["Esnek öğrenme düzenlemeleri", "Danışmanlık kayıtları", "Engelli öğrenci düzenlemeleri", "Uzaktan/harmanlanmış öğretim uygulamaları", "Telafi/mazeret uygulamaları", "Öğrenci destek ve yönlendirme kayıtları"],
            en: ["Flexible learning arrangements", "Advising records", "Arrangements for students with disabilities", "Distance/blended teaching practices", "Make-up/excuse arrangements", "Student support and guidance records"],
          },
        },
        {
          code: "3.3",
          text: {
            tr: "Programda kullanılan öğretim yöntemleri ve sunum biçimleri öğrenme çıktılarıyla uyumludur.",
            en: "The teaching methods and modes of delivery used in the programme are aligned with the learning outcomes.",
          },
          rubric: "B.2.1",
          rubrics: ["B.2.1", "B.3.2", "B.3.4"],
          indicators: [
            {
              tr: "Derslerde kullanılan öğretim yöntemleri, ders öğrenme çıktılarının niteliğine ve düzeyine uygun olarak belirlenmiştir.",
              en: "The teaching methods used in courses are determined in accordance with the nature and level of the course learning outcomes.",
            },
            {
              tr: "Yüz yüze, uzaktan, harmanlanmış, uygulamalı, laboratuvar, atölye, klinik, saha veya işyeri temelli öğretim biçimleri programın amaçlarına ve öğrenme çıktılarına uygun biçimde kullanılmaktadır.",
              en: "Face-to-face, distance, blended, practice-based, laboratory, workshop, clinical, field or workplace-based modes of teaching are used in a manner appropriate to the programme's aims and learning outcomes.",
            },
            {
              tr: "Dijital ve teknolojik araçlar ile uygun olduğu durumlarda yapay zekâ, öğrenme çıktılarının kazanımını destekleyecek biçimde eğitim-öğretim süreçlerine entegre edilmiştir.",
              en: "Digital and technological tools and, where appropriate, artificial intelligence are integrated into teaching and learning processes so as to support the achievement of learning outcomes.",
            },
          ],
          evidence: {
            tr: "Ders bilgi paketleri, öğretim yöntemi-öğrenme çıktısı eşleştirmeleri, ders izlenceleri, uygulama/laboratuvar/proje yönergeleri, uzaktan veya harmanlanmış öğretim materyalleri, dijital öğrenme platformu kayıtları",
            en: "Course information packages, teaching method-learning outcome mappings, course syllabi, practice/laboratory/project directives, distance or blended teaching materials, digital learning platform records",
          },
          suggestions: {
            tr: ["Ders bilgi paketleri", "Öğretim yöntemi-öğrenme çıktısı eşleştirmeleri", "Ders izlenceleri", "Uygulama/laboratuvar/proje yönergeleri", "Uzaktan veya harmanlanmış öğretim materyalleri", "Dijital öğrenme platformu kayıtları"],
            en: ["Course information packages", "Teaching method-learning outcome mappings", "Course syllabi", "Practice/laboratory/project directives", "Distance or blended teaching materials", "Digital learning platform records"],
          },
        },
        {
          code: "3.4",
          text: {
            tr: "Program, öğrenci özerkliğini, akademik rehberlik, danışmanlık ve öğrenme sürecinde karşılıklı saygıyı destekler.",
            en: "The programme supports student autonomy, academic guidance and advising, and mutual respect in the learning process.",
          },
          rubric: "B.3.2",
          rubrics: ["B.1.3", "B.2.2"],
          indicators: [
            {
              tr: "Öğrencilerin kendi öğrenme süreçlerini planlama, izleme ve geliştirme becerilerini destekleyen yapılandırılmış mekanizmalar (akademik danışmanlık, bireysel öğrenme/çalışma planları, mikro yeterlilikler, öz değerlendirme araçları ve uygun dijital destekler) bulunmaktadır.",
              en: "Structured mechanisms (academic advising, individual learning/study plans, micro-credentials, self-assessment tools and appropriate digital support) that support students' skills in planning, monitoring and developing their own learning processes are in place.",
            },
            {
              tr: "Öğrencilere öğrenme sürecinde planlı, yapılandırılmış, süreçleri ve içeriği tanımlı akademik danışmanlık verilmektedir.",
              en: "Students are provided with planned and structured academic advising with defined processes and content during the learning process.",
            },
            {
              tr: "Öğrenci-öğretim elemanı ilişkisinde karşılıklı saygı, açık iletişim ve güvenli öğrenme ortamını destekleyen ilkeler ve uygulamalar bulunmaktadır.",
              en: "Principles and practices supporting mutual respect, open communication and a safe learning environment in the student-teaching staff relationship are in place.",
            },
          ],
          evidence: {
            tr: "Akademik danışmanlık kayıtları, öğrenci rehberleri, ders içi geri bildirim uygulamaları, öğrenci-öğretim elemanı iletişim kanalları, mikro yeterlilik mekanizmaları, öğrenci memnuniyet/geri bildirim kayıtları, etik ve davranış ilkeleri",
            en: "Academic advising records, student guides, in-class feedback practices, student-teaching staff communication channels, micro-credential mechanisms, student satisfaction/feedback records, ethics and conduct principles",
          },
          suggestions: {
            tr: ["Akademik danışmanlık kayıtları", "Öğrenci rehberleri", "Ders içi geri bildirim uygulamaları", "Öğrenci-öğretim elemanı iletişim kanalları", "Mikro yeterlilik mekanizmaları", "Öğrenci memnuniyet/geri bildirim kayıtları", "Etik ve davranış ilkeleri"],
            en: ["Academic advising records", "Student guides", "In-class feedback practices", "Student-teaching staff communication channels", "Micro-credential mechanisms", "Student satisfaction/feedback records", "Ethics and conduct principles"],
          },
        },
        {
          code: "3.5",
          text: {
            tr: "Ölçme-değerlendirme yöntemleri öğrenme çıktılarıyla uyumludur.",
            en: "Assessment methods are aligned with the learning outcomes.",
          },
          rubric: "B.2.2",
          rubrics: ["B.2.2"],
          indicators: [
            {
              tr: "Derslerde kullanılan ölçme-değerlendirme yöntemleri, öğrencilerin ilgili ders öğrenme çıktılarının kazanımını gösterecek şekilde tasarlanmıştır.",
              en: "The assessment methods used in courses are designed so as to demonstrate students' achievement of the relevant course learning outcomes.",
            },
            {
              tr: "Ölçme-değerlendirme araçları, dersin öğrenme çıktılarıyla uyumlu ve programın yapısına göre çeşitlendirilmiş biçimde seçilmektedir.",
              en: "Assessment tools are selected in a manner consistent with the course learning outcomes and diversified according to the structure of the programme.",
            },
            {
              tr: "Farklı kazanım türleri (teorik bilgi, uygulama becerisi, mesleki yetkinlik, araştırma ve iletişim becerisi) her birinin kendi niteliğine uygun ölçme araçlarıyla değerlendirilmektedir.",
              en: "Different types of outcomes (theoretical knowledge, practical skill, professional competence, research and communication skills) are each assessed with measurement tools appropriate to their own nature.",
            },
          ],
          evidence: {
            tr: "Ölçme-değerlendirme yöntemleri, sınav/ödev/proje/rubrik örnekleri, ders öğrenme çıktısı-ölçme yöntemi eşleştirmeleri, uygulama değerlendirme formları, staj/klinik/saha değerlendirme araçları",
            en: "Assessment methods, examination/assignment/project/rubric samples, mappings of course learning outcomes to assessment methods, practice assessment forms, internship/clinical/field assessment tools",
          },
          suggestions: {
            tr: ["Ölçme-değerlendirme yöntemleri", "Sınav/ödev/proje/rubrik örnekleri", "Ders öğrenme çıktısı-ölçme yöntemi eşleştirmeleri", "Uygulama değerlendirme formları", "Staj/klinik/saha değerlendirme araçları"],
            en: ["Assessment methods", "Examination/assignment/project/rubric samples", "Mappings of course learning outcomes to assessment methods", "Practice assessment forms", "Internship/clinical/field assessment tools"],
          },
        },
        {
          code: "3.6",
          text: {
            tr: "Ölçme-değerlendirme süreçleri şeffaf, adil ve tutarlı biçimde yürütülür.",
            en: "Assessment processes are conducted transparently, fairly and consistently.",
          },
          rubric: "B.2.2",
          rubrics: ["A.4.2", "B.2.2"],
          indicators: [
            {
              tr: "Derslerin ölçme-değerlendirme yöntemleri, başarı ölçütleri, notlandırma esasları ve değerlendirme takvimi öğrencilerle önceden paylaşılmaktadır.",
              en: "The assessment methods, achievement criteria, grading principles and assessment calendar of courses are shared with students in advance.",
            },
            {
              tr: "Değerlendirme süreçleri ilan edilmiş usul ve esaslara göre tutarlı biçimde uygulanmaktadır.",
              en: "Assessment processes are applied consistently in accordance with the published principles and procedures.",
            },
            {
              tr: "Mazeret, telafi, engel durumu veya özel koşullara ilişkin değerlendirme düzenlemeleri tanımlıdır ve öğrenciler tarafından erişilebilirdir.",
              en: "Assessment arrangements concerning excuses, make-up, disability or special circumstances are defined and accessible to students.",
            },
            {
              tr: "Programın niteliğine uygun durumlarda değerlendirme sürecinin tutarlılığını artırmak amacıyla dereceli değerlendirme anahtarları (rubrik), standart değerlendirme araçları veya birden fazla değerlendirici gibi uygulamalardan yararlanılmaktadır.",
              en: "Where appropriate to the nature of the programme, practices such as rubrics, standard assessment tools or multiple assessors are used to increase the consistency of the assessment process.",
            },
          ],
          evidence: {
            tr: "Ders izlenceleri, öğrenci bilgi sistemi kayıtları, sınav yönergeleri, rubrikler, notlandırma anahtarları, sınav güvenliği düzenlemeleri, mazeret sınavı kararları, ölçme-değerlendirme usul ve esasları",
            en: "Course syllabi, student information system records, examination directives, rubrics, grading keys, examination security arrangements, make-up examination decisions, assessment principles and procedures",
          },
          suggestions: {
            tr: ["Ders izlenceleri", "Öğrenci bilgi sistemi kayıtları", "Sınav yönergeleri", "Rubrikler", "Notlandırma anahtarları", "Sınav güvenliği düzenlemeleri", "Mazeret sınavı kararları", "Ölçme-değerlendirme usul ve esasları"],
            en: ["Course syllabi", "Student information system records", "Examination directives", "Rubrics", "Grading keys", "Examination security arrangements", "Make-up examination decisions", "Assessment principles and procedures"],
          },
        },
        {
          code: "3.7",
          text: {
            tr: "Öğrencilere öğrenmelerini geliştirecek nitelikte geri bildirim sağlanır.",
            en: "Students are provided with feedback of a quality that will improve their learning.",
          },
          rubric: "B.2.2",
          rubrics: ["A.1.5", "B.2.2", "B.3.2"],
          indicators: [
            {
              tr: "Öğrencilere sınav, ödev, proje, uygulama, staj veya performans değerlendirmeleri sonrasında öğrenmelerini geliştirmeye yönelik geri bildirim verilmektedir.",
              en: "Students are given feedback aimed at improving their learning after examinations, assignments, projects, practice, internships or performance assessments.",
            },
            {
              tr: "Geri bildirimler yalnızca not bildiriminden ibaret olmayıp öğrencinin güçlü yönlerini ve geliştirmesi gereken alanları göstermektedir.",
              en: "Feedback is not limited to reporting a grade but indicates the student's strengths and the areas they need to develop.",
            },
            {
              tr: "Öğrencilerin geri bildirimlere erişimini ve gerektiğinde öğretim elemanıyla açıklama/yeniden değerlendirme süreci yürütebilmesini sağlayan mekanizmalar bulunmaktadır.",
              en: "Mechanisms are in place that enable students to access feedback and, where necessary, to pursue a clarification/re-assessment process with the member of teaching staff.",
            },
          ],
          evidence: {
            tr: "Geri bildirim örnekleri, rubrikler, ödev/proje değerlendirme formları, öğrenme yönetim sistemi geri bildirim kayıtları, uygulama/staj değerlendirme formları",
            en: "Feedback samples, rubrics, assignment/project assessment forms, learning management system feedback records, practice/internship assessment forms",
          },
          suggestions: {
            tr: ["Geri bildirim örnekleri", "Rubrikler", "Ödev/proje değerlendirme formları", "Öğrenme yönetim sistemi geri bildirim kayıtları", "Uygulama/staj değerlendirme formları"],
            en: ["Feedback samples", "Rubrics", "Assignment/project assessment forms", "Learning management system feedback records", "Practice/internship assessment forms"],
          },
        },
        {
          code: "3.8",
          text: {
            tr: "Öğrenci şikâyet ve itiraz süreçleri görünür, erişilebilir ve işlevseldir.",
            en: "Student complaint and appeal processes are visible, accessible and functional.",
          },
          rubric: "A.4.2",
          rubrics: ["B.2.3"],
          indicators: [
            {
              tr: "Öğrencilerin öğrenme-öğretme ve ölçme-değerlendirme süreçlerine ilişkin şikâyet, itiraz ve başvuru yolları tanımlanmış ve öğrencilere duyurulmuştur.",
              en: "The complaint, appeal and application channels available to students regarding learning, teaching and assessment processes are defined and announced to students.",
            },
            {
              tr: "Sınav, not, uygulama, staj, danışmanlık veya öğrenme ortamına ilişkin itiraz ve şikâyetler tanımlı süreçlere göre ele alınmaktadır.",
              en: "Appeals and complaints concerning examinations, grades, practice, internships, advising or the learning environment are handled according to defined processes.",
            },
            {
              tr: "Şikâyet ve itiraz süreçleri öğrenciler açısından erişilebilir, anlaşılır, güvenilir ve ayrımcılıktan uzak biçimde işletilmektedir.",
              en: "Complaint and appeal processes are operated in a manner that is accessible, understandable, reliable and free from discrimination from the students' point of view.",
            },
          ],
          evidence: {
            tr: "Öğrenci şikâyet ve itiraz yönergeleri, sınav itiraz formları, başvuru kanalları, öğrenci bilgi sistemi kayıtları, karar tutanakları, anonimleştirilmiş sonuç duyuruları, öğrenci bilgilendirme dokümanları",
            en: "Student complaint and appeal directives, examination appeal forms, application channels, student information system records, decision minutes, anonymised announcements of outcomes, student information documents",
          },
          suggestions: {
            tr: ["Öğrenci şikâyet ve itiraz yönergeleri", "Sınav itiraz formları", "Başvuru kanalları", "Öğrenci bilgi sistemi kayıtları", "Karar tutanakları", "Anonimleştirilmiş sonuç duyuruları", "Öğrenci bilgilendirme dokümanları"],
            en: ["Student complaint and appeal directives", "Examination appeal forms", "Application channels", "Student information system records", "Decision minutes", "Anonymised announcements of outcomes", "Student information documents"],
          },
        },
      ],
    },
    {
      no: 4,
      code: "4",
      title: { tr: "Öğrenci Kabulü, İlerlemesi, Tanınma ve Mezuniyet", en: "Student Admission, Progression, Recognition and Certification" },
      subs: [
        {
          code: "4.1",
          text: {
            tr: "Programa kabul, kayıt ve yerleştirme süreçleri önceden tanımlanmış, yayımlanmış ve şeffaf biçimde yürütülür.",
            en: "Admission, registration and placement processes for the programme are predefined, published and conducted transparently.",
          },
          rubric: "B.2.3",
          rubrics: ["B.2.3"],
          indicators: [
            {
              tr: "Programa kabul koşulları, kayıt esasları, kontenjanlar ve varsa özel kabul koşullarına ilişkin önerilerinin kurumsal karar mercilerine gerekçeli biçimde iletilmektedir.",
              en: "Proposals concerning admission requirements, registration principles, quotas and any special admission conditions for the programme are submitted to the institutional decision-making bodies with justification.",
            },
            {
              tr: "Kabul ve kayıt süreçlerine ilişkin bilgiler aday öğrencilerin, kayıtlı öğrencilerin ve ilgili paydaşların erişimine sunulmaktadır.",
              en: "Information on admission and registration processes is made available to prospective students, enrolled students and relevant stakeholders.",
            },
            {
              tr: "Programa kabul ve kayıt işlemleri ilan edilmiş kurallara uygun, tutarlı ve ayrımcılıktan uzak biçimde yürütülmektedir.",
              en: "Admission and registration procedures for the programme are carried out in accordance with the published rules, consistently and free from discrimination.",
            },
          ],
          evidence: {
            tr: "Program kabul koşulları, kontenjan bilgileri, YÖKSİS/YKS/kayıt kılavuzu bilgileri, program web sayfası, öğrenci işleri duyuruları, kayıt yönergeleri, özel koşul belgeleri",
            en: "Programme admission requirements, quota information, YÖKSİS/YKS/registration guide information, programme web page, student affairs announcements, registration directives, special condition documents",
          },
          suggestions: {
            tr: ["Program kabul koşulları", "Kontenjan bilgileri", "YÖKSİS/YKS/kayıt kılavuzu bilgileri", "Program web sayfası", "Öğrenci işleri duyuruları", "Kayıt yönergeleri", "Özel koşul belgeleri"],
            en: ["Programme admission requirements", "Quota information", "YÖKSİS/YKS/registration guide information", "Programme web page", "Student affairs announcements", "Registration directives", "Special condition documents"],
          },
        },
        {
          code: "4.2",
          text: {
            tr: "Öğrencilerin programa uyumu ve öğrenim sürecine başlangıcı desteklenir.",
            en: "Students' adaptation to the programme and their start to the learning process are supported.",
          },
          rubric: "B.3.2",
          rubrics: ["A.3.1", "B.1.5", "B.3.2"],
          indicators: [
            {
              tr: "Yeni öğrencilerin programa, kuruma, akademik beklentilere ve öğrenci destek hizmetlerine uyumunu kolaylaştıran bilgilendirme veya oryantasyon uygulamaları bulunmaktadır.",
              en: "Information or orientation practices that facilitate new students' adaptation to the programme, the institution, academic expectations and student support services are in place.",
            },
            {
              tr: "Öğrencilere ders seçimi, akademik beklentiler, program öğrenme çıktıları, ölçme-değerlendirme esasları ve mezuniyet koşulları hakkında bilgi verilmektedir.",
              en: "Students are informed about course selection, academic expectations, programme learning outcomes, assessment principles and graduation requirements.",
            },
            {
              tr: "Öğrencilerin programa uyum sürecinde akademik danışmanlık ve gerekli yönlendirme mekanizmaları işletilmektedir.",
              en: "Academic advising and the necessary guidance mechanisms are operated during students' adaptation to the programme.",
            },
          ],
          evidence: {
            tr: "Oryantasyon programları, öğrenci el kitabı, program tanıtım sunumları, danışmanlık bilgilendirme kayıtları, öğrenci işleri bilgilendirme dokümanları, web duyuruları, akademik takvim ve ders kayıt rehberleri",
            en: "Orientation programmes, student handbook, programme introduction presentations, advising information records, student affairs information documents, web announcements, academic calendar and course registration guides",
          },
          suggestions: {
            tr: ["Oryantasyon programları", "Öğrenci el kitabı", "Program tanıtım sunumları", "Danışmanlık bilgilendirme kayıtları", "Öğrenci işleri bilgilendirme dokümanları", "Web duyuruları", "Akademik takvim ve ders kayıt rehberleri"],
            en: ["Orientation programmes", "Student handbook", "Programme introduction presentations", "Advising information records", "Student affairs information documents", "Web announcements", "Academic calendar and course registration guides"],
          },
        },
        {
          code: "4.3",
          text: {
            tr: "Öğrenci ilerlemesi ve akademik gelişimi tanımlı süreçlerle takip edilir.",
            en: "Student progression and academic development are monitored through defined processes.",
          },
          rubric: "B.2.4",
          rubrics: ["A.5.1", "B.2.3"],
          indicators: [
            {
              tr: "Öğrencilerin ders alma, başarı, dönem/yıl geçişi, mezuniyete ilerleme ve akademik durumlarına ilişkin süreçler tanımlıdır.",
              en: "Processes concerning students' course enrolment, achievement, semester/year progression, progress towards graduation and academic standing are defined.",
            },
            {
              tr: "Akademik danışmanlık sistemi öğrencilerin program içindeki ilerlemesini destekleyecek biçimde işletilmektedir.",
              en: "The academic advising system is operated so as to support students' progression within the programme.",
            },
            {
              tr: "Akademik başarısızlık, ders tekrarı, devamsızlık, kayıt yenilememe veya mezuniyet gecikmesi riski bulunan öğrenciler için yönlendirme ve destek mekanizmaları bulunmaktadır.",
              en: "Guidance and support mechanisms are in place for students at risk of academic failure, course repetition, absenteeism, non-renewal of registration or delayed graduation.",
            },
          ],
          evidence: {
            tr: "Öğrenci bilgi sistemi kayıtları, akademik danışmanlık kayıtları, başarı ve ilerleme raporları, ders alma ve mezuniyet kontrol formları, akademik durum izleme kayıtları, riskli öğrenci listeleri",
            en: "Student information system records, academic advising records, achievement and progression reports, course enrolment and graduation check forms, academic standing monitoring records, lists of at-risk students",
          },
          suggestions: {
            tr: ["Öğrenci bilgi sistemi kayıtları", "Akademik danışmanlık kayıtları", "Başarı ve ilerleme raporları", "Ders alma ve mezuniyet kontrol formları", "Akademik durum izleme kayıtları", "Riskli öğrenci listeleri"],
            en: ["Student information system records", "Academic advising records", "Achievement and progression reports", "Course enrolment and graduation check forms", "Academic standing monitoring records", "Lists of at-risk students"],
          },
        },
        {
          code: "4.4",
          text: {
            tr: "Öğrenci hareketliliği, geçişler ve önceki öğrenmelerin tanınması adil ve tutarlı biçimde yürütülür.",
            en: "Student mobility, transfers and the recognition of prior learning are conducted fairly and consistently.",
          },
          rubric: "B.2.3",
          rubrics: ["B.2.3"],
          indicators: [
            {
              tr: "Yatay geçiş, dikey geçiş, çift ana dal, yan dal, değişim programları, özel öğrenci statüsü ve benzeri hareketlilik süreçlerine ilişkin kurallar tanımlıdır.",
              en: "Rules concerning horizontal transfer, vertical transfer, double major, minor, exchange programmes, special student status and similar mobility processes are defined.",
            },
            {
              tr: "Öğrencilerin daha önce aldığı dersler, yeterlilikler, mikro yeterlilikler, işyeri eğitimi, uygulama deneyimleri veya önceki öğrenmeleri tanımlı usullerle değerlendirilmektedir.",
              en: "Courses, qualifications, micro-credentials, workplace training, practice experience or prior learning previously undertaken by students are evaluated through defined procedures.",
            },
            {
              tr: "Tanınma, muafiyet ve intibak kararları öğrenme çıktıları, kredi/iş yükü, ders içeriği ve yeterlilik düzeyi dikkate alınarak tutarlı biçimde verilmektedir.",
              en: "Recognition, exemption and adaptation decisions are taken consistently, taking into account learning outcomes, credit/workload, course content and qualification level.",
            },
            {
              tr: "Ulusal ve uluslararası hareketlilik süreçlerinde öğrencilerin öğrenim kaybı yaşamamasını destekleyen akademik tanınma mekanizmaları bulunmaktadır.",
              en: "Academic recognition mechanisms that support students in avoiding loss of study time in national and international mobility processes are in place.",
            },
          ],
          evidence: {
            tr: "İntibak ve muafiyet yönergeleri, yatay/dikey geçiş kararları, çift ana dal/yan dal esasları, Erasmus/değişim programı belgeleri, öğrenim anlaşmaları, transkriptler, intibak komisyonu kararları, muafiyet başvuru ve karar formları",
            en: "Adaptation and exemption directives, horizontal/vertical transfer decisions, double major/minor principles, Erasmus/exchange programme documents, learning agreements, transcripts, adaptation committee decisions, exemption application and decision forms",
          },
          suggestions: {
            tr: ["İntibak ve muafiyet yönergeleri", "Yatay/dikey geçiş kararları", "Çift ana dal/yan dal esasları", "Erasmus/değişim programı belgeleri", "Öğrenim anlaşmaları", "Transkriptler", "Intibak komisyonu kararları", "Muafiyet başvuru ve karar formları"],
            en: ["Adaptation and exemption directives", "Horizontal/vertical transfer decisions", "Double major/minor principles", "Erasmus/exchange programme documents", "Learning agreements", "Transcripts", "Adaptation committee decisions", "Exemption application and decision forms"],
          },
        },
        {
          code: "4.5",
          text: {
            tr: "Mezuniyet koşulları ve yeterliliklerin belgelendirilmesi açık ve güvenilirdir.",
            en: "Graduation requirements and the certification of qualifications are clear and reliable.",
          },
          rubric: "B.2.4",
          rubrics: ["A.1.5", "B.2.3", "B.2.4"],
          indicators: [
            {
              tr: "Programın mezuniyet koşulları, tamamlanması gereken kredi/AKTS, zorunlu/seçmeli dersler, staj/uygulama yükümlülükleri ve diğer mezuniyet gerekleri açık biçimde tanımlanmıştır.",
              en: "The programme's graduation requirements, the credits/ECTS to be completed, compulsory/elective courses, internship/practice obligations and other graduation requirements are clearly defined.",
            },
            {
              tr: "Mezuniyet kararları öğrencinin program öğrenme çıktıları, ders yükümlülükleri, uygulama/staj yükümlülükleri ve ilgili mevzuat gereklerini tamamlamasına dayalı olarak verilmektedir.",
              en: "Graduation decisions are taken on the basis of the student's completion of the programme learning outcomes, course obligations, practice/internship obligations and the requirements of the relevant legislation.",
            },
            {
              tr: "Mezunlara verilen diploma eki, kazanılan yeterliliğin düzeyini, içeriğini, öğrenme çıktılarını ve programın statüsünü açıklayacak bilgileri içermektedir.",
              en: "The diploma supplement issued to graduates contains information explaining the level, content, learning outcomes of the qualification obtained and the status of the programme.",
            },
          ],
          evidence: {
            tr: "Mezuniyet koşulları, mezuniyet kontrol listeleri, transkript örnekleri, diploma eki veya ilgili mezuniyet belgeleri, program yeterlilikleri, öğrenci bilgi sistemi kayıtları, staj/uygulama tamamlama belgeleri, mezuniyet komisyonu kararları",
            en: "Graduation requirements, graduation checklists, sample transcripts, diploma supplement or related graduation documents, programme qualifications, student information system records, internship/practice completion documents, graduation committee decisions",
          },
          suggestions: {
            tr: ["Mezuniyet koşulları", "Mezuniyet kontrol listeleri", "Transkript örnekleri", "Diploma eki veya ilgili mezuniyet belgeleri", "Program yeterlilikleri", "Öğrenci bilgi sistemi kayıtları", "Staj/uygulama tamamlama belgeleri", "Mezuniyet komisyonu kararları"],
            en: ["Graduation requirements", "Graduation checklists", "Sample transcripts", "Diploma supplement or related graduation documents", "Programme qualifications", "Student information system records", "Internship/practice completion documents", "Graduation committee decisions"],
          },
        },
        {
          code: "4.6",
          text: {
            tr: "Öğrenci yaşam döngüsüne ilişkin kurallar öğrencilere açık, erişilebilir ve güncel biçimde sunulur.",
            en: "Rules concerning the student life cycle are presented to students in a clear, accessible and up-to-date manner.",
          },
          rubric: "A.1.5",
          rubrics: ["A.1.5"],
          indicators: [
            {
              tr: "Kabul, kayıt, ders alma, devam, başarı, tanınma, itiraz, mezuniyet ve belgelendirme süreçlerine ilişkin kurallar öğrencilerin erişimine sunulmuştur.",
              en: "Rules concerning admission, registration, course enrolment, attendance, achievement, recognition, appeal, graduation and certification processes are made available to students.",
            },
            {
              tr: "Öğrenciler program süresince hakları, yükümlülükleri, başvuru yolları ve akademik süreçler konusunda bilgilendirilmektedir.",
              en: "Students are informed about their rights, obligations, application channels and academic processes throughout the programme.",
            },
            {
              tr: "Öğrenci yaşam döngüsüne ilişkin bilgiler farklı öğrenci grupları için anlaşılır, erişilebilir ve güncel biçimde yayımlanmaktadır.",
              en: "Information concerning the student life cycle is published in a manner that is understandable, accessible and up to date for different student groups.",
            },
          ],
          evidence: {
            tr: "Öğrenci el kitabı, program web sayfası, akademik takvim, yönetmelik/yönerge bağlantıları, ders kayıt kılavuzu, ders bilgi paketleri,sıkça sorulan sorular, öğrenci bilgi sistemi duyuruları, danışmanlık bilgilendirme materyalleri",
            en: "Student handbook, programme web page, academic calendar, links to regulations/directives, course registration guide, course information packages, frequently asked questions, student information system announcements, advising information materials",
          },
          suggestions: {
            tr: ["Öğrenci el kitabı", "Program web sayfası", "Akademik takvim", "Yönetmelik/yönerge bağlantıları", "Ders kayıt kılavuzu", "Ders bilgi paketleri", "Sıkça sorulan sorular", "Öğrenci bilgi sistemi duyuruları", "Danışmanlık bilgilendirme materyalleri"],
            en: ["Student handbook", "Programme web page", "Academic calendar", "Links to regulations/directives", "Course registration guide", "Course information packages", "Frequently asked questions", "Student information system announcements", "Advising information materials"],
          },
        },
      ],
    },
    {
      no: 5,
      code: "5",
      title: { tr: "Öğretim Kadrosu ve Eğitim-Öğretimi Destekleyen Personel", en: "Teaching Staff and Personnel Supporting Learning and Teaching" },
      subs: [
        {
          code: "5.1",
          text: {
            tr: "Programın öğretim kadrosu nicelik ve nitelik bakımından programın amaçları ve öğrenme çıktılarıyla uyumludur.",
            en: "The teaching staff of the programme is aligned with the programme's aims and learning outcomes in terms of both quantity and quality.",
          },
          rubric: "B.4.1",
          rubrics: ["A.3.2", "B.4.1"],
          indicators: [
            {
              tr: "Programda görev yapan öğretim elemanlarının uzmanlık alanları, akademik birikimleri ve mesleki deneyimleri programın amaçları, ders yapısı ve öğrenme çıktılarıyla uyumludur.",
              en: "The areas of expertise, academic background and professional experience of the teaching staff working in the programme are consistent with the programme's aims, course structure and learning outcomes.",
            },
            {
              tr: "Öğretim elemanı sayısı; öğrenci sayısı, ders yükü, uygulama yükü, danışmanlık sorumlulukları ve programın öğretim dili dikkate alındığında yeterlidir.",
              en: "The number of teaching staff is sufficient when the number of students, teaching load, practice load, advising responsibilities and the language of instruction of the programme are taken into account.",
            },
            {
              tr: "Ders görevlendirmeleri öğretim elemanlarının uzmanlık alanı, deneyimi ve dersin öğrenme çıktıları dikkate alınarak yapılmaktadır.",
              en: "Course assignments are made taking into account the area of expertise and experience of the teaching staff and the learning outcomes of the course.",
            },
          ],
          evidence: {
            tr: "Öğretim elemanı listesi, özgeçmişler, uzmanlık alanları, ders görevlendirme tabloları, akademik kadro profili, öğrenci/öğretim elemanı oranları, program-ders-kadro eşleştirmeleri",
            en: "List of teaching staff, curricula vitae, areas of expertise, course assignment tables, academic staff profile, student/teaching staff ratios, programme-course-staff mappings",
          },
          suggestions: {
            tr: ["Öğretim elemanı listesi", "Özgeçmişler", "Uzmanlık alanları", "Ders görevlendirme tabloları", "Akademik kadro profili", "Öğrenci/öğretim elemanı oranları", "Program-ders-kadro eşleştirmeleri"],
            en: ["List of teaching staff", "Curricula vitae", "Areas of expertise", "Course assignment tables", "Academic staff profile", "Student/teaching staff ratios", "Programme-course-staff mappings"],
          },
        },
        {
          code: "5.2",
          text: {
            tr: "Öğretim elemanlarının işe alınması, görevlendirilmesi ve yükseltilmesi süreçleri adil, şeffaf ve tanımlı esaslara dayanır.",
            en: "The recruitment, assignment and promotion processes of teaching staff are based on fair, transparent and defined principles.",
          },
          rubric: "B.4.1",
          rubrics: ["B.4.2", "B.4.3"],
          indicators: [
            {
              tr: "Program, öğretim kadrosu ihtiyacını uzmanlık alanı, ders yükü, öğrenme çıktıları ve öğrenci gereksinimleri temelinde belirler ve kurumsal insan kaynağı süreçlerine girdi sağlar.",
              en: "The programme determines its teaching staff needs on the basis of area of expertise, teaching load, learning outcomes and student requirements, and provides input to institutional human resources processes.",
            },
            {
              tr: "Programda öğretim elemanlarının görevlendirilmesi, ders yükü dağılımı ve akademik görevlerine ilişkin süreçler tanımlı usul ve esaslara göre yürütülmektedir.",
              en: "Processes concerning the assignment of teaching staff, the distribution of teaching load and their academic duties are carried out according to defined principles and procedures.",
            },
            {
              tr: "Akademik görevlendirmelerde programın ihtiyaçları, alan uzmanlığı, eğitim-öğretim yeterliliği ve öğrenci gereksinimleri dikkate alınmaktadır.",
              en: "The needs of the programme, field expertise, teaching competence and student requirements are taken into account in academic assignments.",
            },
            {
              tr: "Programda görev yapan öğretim elemanlarının görev ve sorumlulukları açık biçimde tanımlanmıştır.",
              en: "The duties and responsibilities of the teaching staff working in the programme are clearly defined.",
            },
          ],
          evidence: {
            tr: "Atama ve yükseltme ölçütleri, görevlendirme yazıları, ders yükü dağılımları, akademik kurul kararları, insan kaynakları süreçleri, ilgili mevzuat ve yönergeler, atama ve yükseltmeye yönelik itiraz ve şikayetler",
            en: "Appointment and promotion criteria, assignment letters, teaching load distributions, academic board decisions, human resources processes, relevant legislation and directives, appeals and complaints concerning appointment and promotion",
          },
          suggestions: {
            tr: ["Atama ve yükseltme ölçütleri", "Görevlendirme yazıları", "Ders yükü dağılımları", "Akademik kurul kararları", "Insan kaynakları süreçleri", "Ilgili mevzuat ve yönergeler", "Atama ve yükseltmeye yönelik itiraz ve şikayetler"],
            en: ["Appointment and promotion criteria", "Assignment letters", "Teaching load distributions", "Academic board decisions", "Human resources processes", "Relevant legislation and directives", "Appeals and complaints concerning appointment and promotion"],
          },
        },
        {
          code: "5.3",
          text: {
            tr: "Öğretim elemanlarının eğitim-öğretim yetkinlikleri desteklenir.",
            en: "The teaching competences of the teaching staff are supported.",
          },
          rubric: "B.4.2",
          rubrics: ["B.4.2", "C.2.1", "C.3.2"],
          indicators: [
            {
              tr: "Öğretim elemanlarının pedagojik yeterlilik, öğrenci merkezli öğrenme/öğretme, ölçme-değerlendirme, dijital öğretim ve kapsayıcı eğitim konularındaki gelişimleri desteklenmektedir.",
              en: "The development of teaching staff in pedagogical competence, student-centred learning/teaching, assessment, digital teaching and inclusive education is supported.",
            },
            {
              tr: "Öğretim elemanlarının öğrenme çıktıları, ders tasarımı, aktif öğrenme yöntemleri ve öğrenci geri bildirimi konularında yetkinlik geliştirmelerine yönelik imkânlar bulunmaktadır.",
              en: "Opportunities are available for teaching staff to develop competence in learning outcomes, course design, active learning methods and student feedback.",
            },
            {
              tr: "Öğretim elemanlarının yenilikçi öğretim yöntemlerini ve dijital/üretken yapay zekâ uygulamalarını eğitim-öğretim süreçlerine entegre etmelerini destekleyen teşvik ve destek mekanizmaları bulunmaktadır.",
              en: "Incentive and support mechanisms are in place to support teaching staff in integrating innovative teaching methods and digital/generative artificial intelligence applications into teaching and learning processes.",
            },
          ],
          evidence: {
            tr: "Eğiticilerin eğitimi kayıtları, hizmet içi eğitimler, ölçme-değerlendirme eğitimleri, dijital öğretim eğitimleri, kapsayıcı eğitim faaliyetleri, katılım belgeleri",
            en: "Training-of-trainers records, in-service training, assessment training, digital teaching training, inclusive education activities, certificates of attendance",
          },
          suggestions: {
            tr: ["Eğiticilerin eğitimi kayıtları", "Hizmet içi eğitimler", "Ölçme-değerlendirme eğitimleri", "Dijital öğretim eğitimleri", "Kapsayıcı eğitim faaliyetleri", "Katılım belgeleri"],
            en: ["Training-of-trainers records", "In-service training", "Assessment training", "Digital teaching training", "Inclusive education activities", "Certificates of attendance"],
          },
        },
        {
          code: "5.4",
          text: {
            tr: "Öğretim elemanlarının akademik, mesleki ve bilimsel gelişimi programın niteliğini destekler.",
            en: "The academic, professional and scientific development of the teaching staff supports the quality of the programme.",
          },
          rubric: "B.4.2",
          rubrics: ["B.4.2", "B.4.3", "C.3.2"],
          indicators: [
            {
              tr: "Öğretim elemanlarının akademik araştırma, akademik izin (sabatikal), mesleki uygulama, sanatsal faaliyet, sektörel deneyim veya alanla ilgili mesleki gelişim faaliyetleri programın güncelliğine katkı sağlamaktadır.",
              en: "The academic research, sabbatical leave, professional practice, artistic activity, sectoral experience or field-related professional development activities of the teaching staff contribute to the currency of the programme.",
            },
            {
              tr: "Öğretim elemanlarının alanlarındaki güncel bilimsel, mesleki ve teknolojik gelişmeleri programın eğitim-öğretim süreçlerine yansıtması desteklenmektedir.",
              en: "Teaching staff are supported in reflecting current scientific, professional and technological developments in their fields in the teaching and learning processes of the programme.",
            },
            {
              tr: "Programda öğretim elemanlarının araştırma, uygulama ve toplumsal katkı faaliyetleri ile öğrenme-öğretme süreçleri arasında ilişki kurulmaktadır.",
              en: "A relationship is established between the research, practice and community service activities of the teaching staff and the learning and teaching processes in the programme.",
            },
          ],
          evidence: {
            tr: "Yayınlar, projeler, mesleki sertifikalar, sektör deneyimi belgeleri, sabatik izne çıkma oranı, konferans/çalıştay katılımları, araştırma ve uygulama faaliyetleri, akademik performans takip sistem çıktıları, dış paydaş faaliyetleri, sürdürülebilir kalkınma hedefleri kapsamında yürütülen faaliyetler",
            en: "Publications, projects, professional certificates, documents of sectoral experience, sabbatical leave take-up rate, conference/workshop participation, research and practice activities, outputs of the academic performance monitoring system, external stakeholder activities, activities carried out within the scope of the sustainable development goals",
          },
          suggestions: {
            tr: ["Yayınlar", "Projeler", "Mesleki sertifikalar", "Sektör deneyimi belgeleri", "Sabatik izne çıkma oranı", "Konferans/çalıştay katılımları", "Araştırma ve uygulama faaliyetleri", "Akademik performans takip sistem çıktıları", "Dış paydaş faaliyetleri", "Sürdürülebilir kalkınma hedefleri kapsamında yürütülen faaliyetler"],
            en: ["Publications", "Projects", "Professional certificates", "Documents of sectoral experience", "Sabbatical leave take-up rate", "Conference/workshop participation", "Research and practice activities", "Outputs of the academic performance monitoring system", "External stakeholder activities", "Activities carried out within the scope of the sustainable development goals"],
          },
        },
        {
          code: "5.5",
          text: {
            tr: "Öğretim elemanlarının eğitim-öğretim performansı çoklu geri bildirim kaynaklarıyla değerlendirilir.",
            en: "The teaching performance of the teaching staff is evaluated through multiple feedback sources.",
          },
          rubric: "A.3.2",
          rubrics: ["A.3.2", "B.3.1", "B.3.3"],
          indicators: [
            {
              tr: "Öğretim elemanlarının eğitim-öğretim performansının değerlendirilmesinde öğrenci geri bildirimleri, ders değerlendirmeleri, akademik kurul değerlendirmeleri veya benzeri kaynaklardan yararlanılmaktadır.",
              en: "Student feedback, course evaluations, academic board evaluations or similar sources are used in evaluating the teaching performance of the teaching staff.",
            },
            {
              tr: "Öğrenci geri bildirimleri öğretim elemanlarının öğretim yöntemleri, iletişim, geri bildirim verme, ölçme-değerlendirme ve ders organizasyonu gibi alanlarda gelişimini desteklemek üzere kullanılmaktadır.",
              en: "Student feedback is used to support the development of teaching staff in areas such as teaching methods, communication, giving feedback, assessment and course organisation.",
            },
            {
              tr: "Öğretim performansına ilişkin değerlendirme süreçleri öğretim elemanlarının mesleki gelişimiyle ilişkilendirilmektedir.",
              en: "Evaluation processes concerning teaching performance are related to the professional development of teaching staff.",
            },
          ],
          evidence: {
            tr: "Ders değerlendirme anketleri, öğrenci geri bildirimleri, öğretim elemanı performans değerlendirme kayıtları, akademik kurul tutanakları, ders gözlem formları, akran değerlendirmeleri, öz değerlendirme formları, geri bildirim raporları",
            en: "Course evaluation surveys, student feedback, teaching staff performance evaluation records, academic board minutes, course observation forms, peer evaluations, self-assessment forms, feedback reports",
          },
          suggestions: {
            tr: ["Ders değerlendirme anketleri", "Öğrenci geri bildirimleri", "Öğretim elemanı performans değerlendirme kayıtları", "Akademik kurul tutanakları", "Ders gözlem formları", "Akran değerlendirmeleri", "Öz değerlendirme formları", "Geri bildirim raporları"],
            en: ["Course evaluation surveys", "Student feedback", "Teaching staff performance evaluation records", "Academic board minutes", "Course observation forms", "Peer evaluations", "Self-assessment forms", "Feedback reports"],
          },
        },
        {
          code: "5.6",
          text: {
            tr: "Eğitim-öğretimi destekleyen idari, teknik ve uygulama personeli programın ihtiyaçlarını karşılayacak yeterliliktedir.",
            en: "The administrative, technical and practice personnel supporting learning and teaching are sufficient to meet the needs of the programme.",
          },
          rubric: "B.1.6",
          rubrics: ["A.4.1", "B.1.6", "B.4.1"],
          indicators: [
            {
              tr: "Programın yapısı gerektiriyorsa laboratuvar, atölye, klinik, saha, dijital öğrenme ortamı veya öğrenci işleri süreçlerini destekleyen idari/teknik personel yeterliliği izlenir.",
              en: "If the structure of the programme so requires, the adequacy of administrative/technical personnel supporting laboratory, workshop, clinic, field, digital learning environment or student affairs processes is monitored.",
            },
            {
              tr: "Eğitim-öğretimi destekleyen personelin sayısı, uzmanlığı ve yetkinliği programın uygulama bileşenleri ve öğrenci ihtiyaçlarıyla uyumludur.",
              en: "The number, expertise and competence of the personnel supporting learning and teaching are aligned with the practical components of the programme and student needs.",
            },
            {
              tr: "Destek personelinin mesleki gelişimi, iş sağlığı ve güvenliği, öğrenciyle iletişim, dijital sistemler veya ilgili teknik alanlarda yetkinlikleri desteklenmektedir.",
              en: "The professional development of support personnel and their competences in occupational health and safety, communication with students, digital systems or relevant technical areas are supported.",
            },
          ],
          evidence: {
            tr: "Teknik/idari personel listeleri, görev tanımları, laboratuvar/atölye/klinik sorumlu listeleri, öğrenci işleri süreçleri, destek hizmet kayıtları, eğitim ve sertifika belgeleri",
            en: "Lists of technical/administrative personnel, job descriptions, lists of laboratory/workshop/clinic supervisors, student affairs processes, support service records, training and certification documents",
          },
          suggestions: {
            tr: ["Teknik/idari personel listeleri", "Görev tanımları", "Laboratuvar/atölye/klinik sorumlu listeleri", "Öğrenci işleri süreçleri", "Destek hizmet kayıtları", "Eğitim ve sertifika belgeleri"],
            en: ["Lists of technical/administrative personnel", "Job descriptions", "Lists of laboratory/workshop/clinic supervisors", "Student affairs processes", "Support service records", "Training and certification documents"],
          },
        },
        {
          code: "5.7",
          text: {
            tr: "Staj, işyeri eğitimi, klinik uygulama, okul deneyimi, mesleki uygulama, saha çalışması veya benzeri süreçlerde görev alan eğiticilerin, uygulama sorumluları ve mesleki paydaşların yeterliliği güvence altındadır.",
            en: "The competence of the trainers, practice supervisors and professional stakeholders taking part in internships, workplace training, clinical practice, school experience, professional practice, fieldwork or similar processes is assured.",
          },
          optional: true,
          scopeNote: {
            tr: "Bu alt ölçüt staj ve uygulamalı eğitimin olduğu programlar için geçerlidir.",
            en: "This sub-criterion applies to programmes that include internships and practical training.",
          },
          rubric: "B.1.6",
          rubrics: ["B.3.1", "B.3.3"],
          indicators: [
            {
              tr: "Staj, işyeri eğitimi, klinik uygulama, okul deneyimi, mesleki uygulama, saha çalışması veya benzeri süreçlerde görev alan eğiticilerin ve uygulama sorumlularının rolleri tanımlıdır.",
              en: "The roles of the trainers and practice supervisors taking part in internships, workplace training, clinical practice, school experience, professional practice, fieldwork or similar processes are defined.",
            },
            {
              tr: "Eğiticiler veya uygulama sorumluları program öğrenme çıktıları, uygulama beklentileri, öğrenci değerlendirme süreçleri ve iletişim kanalları hakkında bilgilendirilmektedir.",
              en: "Trainers or practice supervisors are informed about programme learning outcomes, practice expectations, student assessment processes and communication channels.",
            },
            {
              tr: "Program dışı öğrenme ortamlarında görev alan kişilerin mesleki yeterliliği, deneyimi ve programla ilişkisi dikkate alınmaktadır.",
              en: "The professional competence and experience of those taking part in learning environments outside the programme, and their relationship with the programme, are taken into account.",
            },
            {
              tr: "Eğiticiler, uygulama sorumluları, mesleki paydaşlar ve öğrencilerden uygulama süreçlerine ilişkin geri bildirim alınmakta ve bu geri bildirimler programın geliştirilmesinde kullanılmaktadır.",
              en: "Feedback on practice processes is obtained from trainers, practice supervisors, professional stakeholders and students, and this feedback is used in developing the programme.",
            },
          ],
          evidence: {
            tr: "Eğitici görevlendirme kayıtları, uygulama protokolleri, işyeri eğitimi sorumlusu listeleri, dış eğitici özgeçmişleri, uygulama değerlendirme formları, kurum/işletme sorumlu bilgileri, bilgilendirme materyalleri",
            en: "Trainer appointment records, practice protocols, lists of workplace training supervisors, curricula vitae of external trainers, practice assessment forms, information on institution/enterprise supervisors, information materials",
          },
          suggestions: {
            tr: ["Eğitici görevlendirme kayıtları", "Uygulama protokolleri", "Işyeri eğitimi sorumlusu listeleri", "Dış eğitici özgeçmişleri", "Uygulama değerlendirme formları", "Kurum/işletme sorumlu bilgileri", "Bilgilendirme materyalleri"],
            en: ["Trainer appointment records", "Practice protocols", "Lists of workplace training supervisors", "Curricula vitae of external trainers", "Practice assessment forms", "Information on institution/enterprise supervisors", "Information materials"],
          },
        },
      ],
    },
    {
      no: 6,
      code: "6",
      title: { tr: "Öğrenme Ortamı, Kaynaklar ve Öğrenci Desteği", en: "Learning Environment, Resources and Student Support" },
      subs: [
        {
          code: "6.1",
          text: {
            tr: "Programın fiziksel, dijital ve teknolojik öğrenme altyapısı program amaçlarıyla uyumludur.",
            en: "The physical, digital and technological learning infrastructure of the programme is aligned with the programme's aims.",
          },
          rubric: "B.3.1",
          rubrics: ["B.3.1"],
          indicators: [
            {
              tr: "Programın derslik, laboratuvar, atölye, klinik, stüdyo, uygulama alanı, bilgisayar altyapısı ve dijital öğrenme ortamları programın amaçları ve öğrenme çıktılarını desteklemektedir.",
              en: "The classrooms, laboratories, workshops, clinics, studios, practice areas, computing infrastructure and digital learning environments of the programme support the programme's aims and learning outcomes.",
            },
            {
              tr: "Öğrenme ortamlarının kapasitesi, donanımı ve kullanım düzeni öğrenci sayısı, ders yapısı ve uygulama gerekliliklerini karşılayacak düzeydedir.",
              en: "The capacity, equipment and usage arrangements of the learning environments are at a level that meets the number of students, the course structure and practice requirements.",
            },
          ],
          evidence: {
            tr: "Derslik, laboratuvar, atölye, klinik ve uygulama alanı envanterleri; dijital öğrenme platformu kayıtları; teknik altyapı listeleri; kapasite bilgileri; kullanım planları; program-ders-altyapı eşleştirmeleri",
            en: "Inventories of classrooms, laboratories, workshops, clinics and practice areas; digital learning platform records; technical infrastructure lists; capacity information; usage plans; programme-course-infrastructure mappings",
          },
          suggestions: {
            tr: ["Derslik, laboratuvar, atölye, klinik ve uygulama alanı envanterleri", "Dijital öğrenme platformu kayıtları", "Teknik altyapı listeleri", "Kapasite bilgileri", "Kullanım planları", "Program-ders-altyapı eşleştirmeleri"],
            en: ["Inventories of classrooms, laboratories, workshops, clinics and practice areas", "Digital learning platform records", "Technical infrastructure lists", "Capacity information", "Usage plans", "Programme-course-infrastructure mappings"],
          },
        },
        {
          code: "6.2",
          text: {
            tr: "Programın öğrenme kaynakları yeterli, güncel ve erişilebilirdir.",
            en: "The learning resources of the programme are sufficient, up to date and accessible.",
          },
          rubric: "B.3.1",
          rubrics: ["B.1.3", "B.3.1", "B.3.3"],
          indicators: [
            {
              tr: "Program öğrencilerinin öğrenme kaynaklarına (kütüphane kaynakları, veri tabanları, özel yazılımlar, simülasyon araçları vb.) erişimi bulunmaktadır.",
              en: "Students of the programme have access to learning resources (library resources, databases, specialised software, simulation tools, etc.).",
            },
            {
              tr: "Öğrenme kaynakları programın alanı, ders içerikleri, öğrenme çıktıları ve öğrenci ihtiyaçlarıyla ilişkilidir.",
              en: "Learning resources are related to the field of the programme, course content, learning outcomes and student needs.",
            },
            {
              tr: "Öğrenciler öğrenme kaynaklarına kampüs içinde ve uygun olduğu durumlarda çevrim içi olarak erişebilmektedir.",
              en: "Students can access learning resources on campus and, where appropriate, online.",
            },
          ],
          evidence: {
            tr: "Kütüphane kaynak listeleri, veri tabanı abonelikleri, ders materyalleri, açık ders kaynakları, yazılım lisansları, simülasyon araçları, öğrenme yönetim sistemi içerikleri, kaynak kullanım istatistikleri",
            en: "Library resource lists, database subscriptions, course materials, open educational resources, software licences, simulation tools, learning management system content, resource usage statistics",
          },
          suggestions: {
            tr: ["Kütüphane kaynak listeleri", "Veri tabanı abonelikleri", "Ders materyalleri", "Açık ders kaynakları", "Yazılım lisansları", "Simülasyon araçları", "Öğrenme yönetim sistemi içerikleri", "Kaynak kullanım istatistikleri"],
            en: ["Library resource lists", "Database subscriptions", "Course materials", "Open educational resources", "Software licences", "Simulation tools", "Learning management system content", "Resource usage statistics"],
          },
        },
        {
          code: "6.3",
          text: {
            tr: "Programın uygulamalı eğitim ortamları güvenli, yeterli ve öğrenme çıktılarıyla uyumludur.",
            en: "The practical training environments of the programme are safe, adequate and aligned with the learning outcomes.",
          },
          optional: true,
          scopeNote: {
            tr: "Bu alt ölçüt uygulamalı eğitimin olduğu programlar için geçerlidir.",
            en: "This sub-criterion applies to programmes that include practical training.",
          },
          rubric: "B.3.1",
          rubrics: ["B.3.2", "B.3.5"],
          indicators: [
            {
              tr: "Laboratuvar, atölye, klinik, saha, staj, işyeri eğitimi veya benzeri uygulamalı öğrenme ortamları ilgili ders/uygulama kazanımlarıyla ilişkilendirilmiştir.",
              en: "Laboratory, workshop, clinical, field, internship, workplace training or similar practical learning environments are related to the relevant course/practice outcomes.",
            },
            {
              tr: "Uygulamalı eğitim ortamlarında gerekli donanım, ekipman, güvenlik önlemleri ve teknik destek sağlanmaktadır.",
              en: "The necessary equipment, hardware, safety measures and technical support are provided in practical training environments.",
            },
            {
              tr: "Öğrencilere uygulama ortamlarının kullanımı, güvenlik kuralları, mesleki etik ve uygulama beklentileri hakkında bilgilendirme yapılmaktadır.",
              en: "Students are informed about the use of practice environments, safety rules, professional ethics and practice expectations.",
            },
          ],
          evidence: {
            tr: "Uygulama alanı envanterleri, laboratuvar/atölye/klinik yönergeleri, iş sağlığı ve güvenliği belgeleri, risk değerlendirmeleri, uygulama planları, cihaz ve ekipman listeleri, staj/işyeri eğitimi protokolleri",
            en: "Practice area inventories, laboratory/workshop/clinic directives, occupational health and safety documents, risk assessments, practice plans, device and equipment lists, internship/workplace training protocols",
          },
          suggestions: {
            tr: ["Uygulama alanı envanterleri", "Laboratuvar/atölye/klinik yönergeleri", "Iş sağlığı ve güvenliği belgeleri", "Risk değerlendirmeleri", "Uygulama planları", "Cihaz ve ekipman listeleri", "Staj/işyeri eğitimi protokolleri"],
            en: ["Practice area inventories", "Laboratory/workshop/clinic directives", "Occupational health and safety documents", "Risk assessments", "Practice plans", "Device and equipment lists", "Internship/workplace training protocols"],
          },
        },
        {
          code: "6.4",
          text: {
            tr: "Öğrenci kaynakları ve destek hizmetleri öğrenci ihtiyaçlarıyla uyumludur ve öğrenciler bu hizmetlerden düzenli olarak haberdar edilir.",
            en: "Student resources and support services are aligned with student needs, and students are regularly informed about these services.",
          },
          rubric: "B.3.2",
          rubrics: ["B.3.1", "B.3.3", "B.3.4"],
          indicators: [
            {
              tr: "Öğrenme kaynakları, destek hizmetleri, danışmanlık olanakları, kütüphane ve dijital kaynaklar hakkında bilgiler güncel, anlaşılır ve erişilebilir şekilde öğrencilere sunulmaktadır.",
              en: "Information about learning resources, support services, advising opportunities, the library and digital resources is presented to students in an up-to-date, understandable and accessible manner.",
            },
            {
              tr: "Yeni öğrenciler ve mevcut öğrenciler destek hizmetlerine nasıl erişecekleri konusunda bilgilendirilmektedir.",
              en: "New and current students are informed about how to access support services.",
            },
            {
              tr: "Program, ihtiyaç duyan öğrencileri ilgili akademik, idari, psikolojik, sosyal veya kariyer destek birimlerine yönlendirmektedir.",
              en: "The programme refers students in need to the relevant academic, administrative, psychological, social or career support units.",
            },
            {
              tr: "Akademik danışmanlık ile kurum tarafından sunulan kariyer, psikolojik danışmanlık, engelli öğrenci, sosyal destek ve öğrenci işleri hizmetlerine öğrencilerin erişimi bulunmaktadır.",
              en: "Students have access to academic advising and to the career, psychological counselling, disability support, social support and student affairs services offered by the institution.",
            },
          ],
          evidence: {
            tr: "Öğrenci el kitabı, web sayfası, oryantasyon sunumları, kütüphane/dijital kaynak eğitimleri, destek hizmet duyuruları, öğrenci bilgi sistemi duyuruları, danışmanlık bilgilendirme materyalleri, akademik danışmanlık kayıtları, kariyer merkezi hizmetleri, psikolojik danışmanlık hizmetleri, engelli öğrenci birimi kayıtları, öğrenci işleri süreçleri, destek hizmet duyuruları, yönlendirme kayıtları",
            en: "Student handbook, web page, orientation presentations, library/digital resource training, support service announcements, student information system announcements, advising information materials, academic advising records, career centre services, psychological counselling services, disability support unit records, student affairs processes, referral records",
          },
          suggestions: {
            tr: ["Öğrenci el kitabı", "Web sayfası", "Oryantasyon sunumları", "Kütüphane/dijital kaynak eğitimleri", "Destek hizmet duyuruları", "Öğrenci bilgi sistemi duyuruları", "Danışmanlık bilgilendirme materyalleri", "Akademik danışmanlık kayıtları", "Kariyer merkezi hizmetleri", "Psikolojik danışmanlık hizmetleri", "Engelli öğrenci birimi kayıtları", "Öğrenci işleri süreçleri", "Destek hizmet duyuruları", "Yönlendirme kayıtları"],
            en: ["Student handbook", "Web page", "Orientation presentations", "Library/digital resource training", "Support service announcements", "Student information system announcements", "Advising information materials", "Academic advising records", "Career centre services", "Psychological counselling services", "Disability support unit records", "Student affairs processes", "Referral records"],
          },
        },
        {
          code: "6.5",
          text: {
            tr: "Öğrenme ortamı farklı öğrenci profilleri için erişilebilir ve kapsayıcıdır.",
            en: "The learning environment is accessible and inclusive for different student profiles.",
          },
          rubric: "B.3.4",
          rubrics: ["A.1.5", "B.3.1", "B.3.2"],
          indicators: [
            {
              tr: "Fiziksel ve dijital öğrenme ortamlarının erişilebilirliği dezavantajlı gruplar, uluslararası öğrenciler ve çalışan öğrencilerin öğrenme sürecine eşit katılımını desteklemektedir.",
              en: "The accessibility of physical and digital learning environments supports the equal participation of disadvantaged groups, international students and working students in the learning process.",
            },
            {
              tr: "Yalnızca yabancı dilde yürütülen, uluslararası ortaklı veya uluslararası öğrenci ağırlıklı programlarda; öğrencilerin programa uyumunu ve akademik başarılarını desteklemeye yönelik gerekli izleme ve destek mekanizmaları uygulanmaktadır.",
              en: "In programmes delivered solely in a foreign language, with international partnerships or with a predominantly international student body, the necessary monitoring and support mechanisms aimed at supporting students' adaptation to the programme and their academic achievement are implemented.",
            },
          ],
          evidence: {
            tr: "Erişilebilirlik düzenlemeleri, engelli öğrenci destek kararları, uyarlanmış materyaller, altyapı erişilebilirlik belgeleri, uluslararası öğrenci destek kayıtları, esnek öğrenme düzenlemeleri, kapsayıcılık uygulamaları",
            en: "Accessibility arrangements, disability support decisions, adapted materials, infrastructure accessibility documents, international student support records, flexible learning arrangements, inclusion practices",
          },
          suggestions: {
            tr: ["Erişilebilirlik düzenlemeleri", "Engelli öğrenci destek kararları", "Uyarlanmış materyaller", "Altyapı erişilebilirlik belgeleri", "Uluslararası öğrenci destek kayıtları", "Esnek öğrenme düzenlemeleri", "Kapsayıcılık uygulamaları"],
            en: ["Accessibility arrangements", "Disability support decisions", "Adapted materials", "Infrastructure accessibility documents", "International student support records", "Flexible learning arrangements", "Inclusion practices"],
          },
        },
        {
          code: "6.6",
          text: {
            tr: "Program, öğrenci hareketliliği süreçlerini destekleyen hizmetlere sahiptir.",
            en: "The programme has services supporting student mobility processes.",
          },
          rubric: "B.2.3",
          rubrics: ["A.2.3", "A.3.1", "B.1.5"],
          indicators: [
            {
              tr: "Öğrencilerin ulusal ve uluslararası hareketlilik, değişim programları ve benzeri öğrenme fırsatlarına erişimini destekleyen bilgilendirme ve yönlendirme mekanizmaları bulunmaktadır.",
              en: "Information and guidance mechanisms supporting students' access to national and international mobility, exchange programmes and similar learning opportunities are in place.",
            },
            {
              tr: "Hareketlilik veya program dışı öğrenme süreçlerine katılan öğrenciler akademik, idari ve öğrenme kaynakları bakımından desteklenmektedir.",
              en: "Students participating in mobility or learning processes outside the programme are supported in terms of academic and administrative matters and learning resources.",
            },
          ],
          evidence: {
            tr: "Değişim programları bilgilendirmeleri, duyuruları, hareketlilik ofisi kayıtları, öğrenim anlaşmaları, danışmanlık kayıtları, başvuru kılavuzları, hareketlilik destek belgeleri",
            en: "Exchange programme information and announcements, mobility office records, learning agreements, advising records, application guides, mobility support documents",
          },
          suggestions: {
            tr: ["Değişim programları bilgilendirmeleri", "Duyuruları", "Hareketlilik ofisi kayıtları", "Öğrenim anlaşmaları", "Danışmanlık kayıtları", "Başvuru kılavuzları", "Hareketlilik destek belgeleri"],
            en: ["Exchange programme information and announcements", "Mobility office records", "Learning agreements", "Advising records", "Application guides", "Mobility support documents"],
          },
        },
      ],
    },
    {
      no: 7,
      code: "7",
      title: { tr: "Bilgi Yönetimi ve Sürekli İyileştirme", en: "Information Management and Continuous Improvement" },
      subs: [
        {
          code: "7.1",
          text: {
            tr: "Program düzeyinde karar alma süreçlerini destekleyen ilgili ve güvenilir veriler tanımlanmıştır.",
            en: "Relevant and reliable data supporting decision-making processes at programme level are defined.",
          },
          rubric: "A.3.1",
          rubrics: ["A.2.3", "A.3.1", "B.1.5"],
          indicators: [
            {
              tr: "Programın yönetimi ve kalite güvencesi için izlenecek temel veriler, göstergeler, bilgi kaynakları; programın amaçları, öğrenme çıktıları, öğrenci destek hizmetleri, öğrenme kaynakları ve mezun profilini de kapsayacak şekilde tanımlanmıştır.",
              en: "The key data, indicators and information sources to be monitored for the management and quality assurance of the programme are defined so as to cover the programme's aims, learning outcomes, student support services, learning resources and graduate profile.",
            },
            {
              tr: "Program düzeyinde öğrenci profili, öğrenci sayıları, başarı, ilerleme, mezuniyet, terk, ders tekrarı, yatay/dikey geçiş, hareketlilik ve benzeri öğrenci yaşam döngüsü verileri kayıt altındadır.",
              en: "Student life cycle data such as student profile, student numbers, achievement, progression, graduation, drop-out, course repetition, horizontal/vertical transfer and mobility are recorded at programme level.",
            },
            {
              tr: "Kullanılan verilerin güncelliği, doğruluğu, bütünlüğü ve güvenilirliği için sorumluluklar ve veri kaynakları açıkça belirlenmiştir.",
              en: "Responsibilities and data sources for the currency, accuracy, completeness and reliability of the data used are clearly established.",
            },
          ],
          evidence: {
            tr: "Program göstergeleri listesi, veri yönetimi planı, gösterge kartları, yıllık program değerlendirme şablonları, öğrenci bilgi sistemi raporları",
            en: "List of programme indicators, data management plan, indicator cards, annual programme evaluation templates, student information system reports",
          },
          suggestions: {
            tr: ["Program göstergeleri listesi", "Veri yönetimi planı", "Gösterge kartları", "Yıllık program değerlendirme şablonları", "Öğrenci bilgi sistemi raporları"],
            en: ["List of programme indicators", "Data management plan", "Indicator cards", "Annual programme evaluation templates", "Student information system reports"],
          },
        },
        {
          code: "7.2",
          text: {
            tr: "Program verileri düzenli olarak toplanır, analiz edilir ve yorumlanır.",
            en: "Programme data are collected, analysed and interpreted regularly.",
          },
          rubric: "A.3.1",
          rubrics: ["A.4.1", "A.4.2", "A.4.3", "B.1.5"],
          indicators: [
            {
              tr: "Program düzeyindeki nicel ve nitel veriler belirli aralıklarla toplanmakta ve analiz edilmektedir.",
              en: "Quantitative and qualitative data at programme level are collected and analysed at defined intervals.",
            },
            {
              tr: "Ders başarıları, öğrenci ilerlemesi, mezuniyet oranları, öğrenci iş yükü, ders değerlendirmeleri ve program memnuniyeti gibi veriler program düzeyinde değerlendirilmektedir.",
              en: "Data such as course achievement, student progression, graduation rates, student workload, course evaluations and programme satisfaction are evaluated at programme level.",
            },
            {
              tr: "Veriler yalnızca raporlanmakla kalmayıp programın güçlü yönlerini, risk alanlarını ve gelişmeye açık yönlerini ortaya koyacak biçimde yorumlanmaktadır.",
              en: "Data are not merely reported but interpreted so as to reveal the programme's strengths, risk areas and areas open to improvement.",
            },
            {
              tr: "Program verileri yıllar, dönemler, dersler ve öğrenci grupları temelinde karşılaştırmalı olarak analiz edilir; mümkün olduğunda benzer programlarla kıyaslama yapılmaktadır.",
              en: "Programme data are analysed comparatively on the basis of years, terms, courses and student groups; where possible, benchmarking with similar programmes is carried out.",
            },
          ],
          evidence: {
            tr: "Öğrenci bilgi sistemi çıktıları, ders başarı analizleri, mezuniyet/terk/ilerleme raporları, anket analizleri, odak grup raporları, danışmanlık özetleri, program değerlendirme raporları, kalite komisyonu kararları",
            en: "Student information system outputs, course achievement analyses, graduation/drop-out/progression reports, survey analyses, focus group reports, advising summaries, programme evaluation reports, quality committee decisions",
          },
          suggestions: {
            tr: ["Öğrenci bilgi sistemi çıktıları", "Ders başarı analizleri", "Mezuniyet/terk/ilerleme raporları", "Anket analizleri", "Odak grup raporları", "Danışmanlık özetleri", "Program değerlendirme raporları", "Kalite komisyonu kararları"],
            en: ["Student information system outputs", "Course achievement analyses", "Graduation/drop-out/progression reports", "Survey analyses", "Focus group reports", "Advising summaries", "Programme evaluation reports", "Quality committee decisions"],
          },
        },
        {
          code: "7.3",
          text: {
            tr: "Öğrenci, mezun, öğretim elemanı, işveren ve dış paydaş geri bildirimleri sistematik biçimde değerlendirilir.",
            en: "Feedback from students, graduates, teaching staff, employers and external stakeholders is evaluated systematically.",
          },
          rubric: "A.4.1",
          rubrics: ["A.1.4", "A.2.3", "A.3.1", "A.4.2", "A.4.3", "B.1.5"],
          indicators: [
            {
              tr: "Program öğrencilerden, mezunlardan, öğretim elemanlarından, işverenlerden ve ilgili dış paydaşlardan düzenli geri bildirim almaktadır.",
              en: "The programme receives regular feedback from students, graduates, teaching staff, employers and relevant external stakeholders.",
            },
            {
              tr: "Geri bildirimler program amaçları, müfredat, öğrenme-öğretme süreçleri, ölçme-değerlendirme, danışmanlık, öğrenme kaynakları ve destek hizmetleriyle ilişkilendirilerek analiz edilmektedir.",
              en: "Feedback is analysed in relation to programme aims, the curriculum, learning and teaching processes, assessment, advising, learning resources and support services.",
            },
            {
              tr: "Öğrenci memnuniyeti ve öğrenci deneyimi verileri, programın öğrenme ortamı ve destek hizmetlerinin değerlendirilmesinde kullanılmaktadır.",
              en: "Student satisfaction and student experience data are used in evaluating the programme's learning environment and support services.",
            },
            {
              tr: "Mezun ve işveren geri bildirimleri; programın mezun yeterliliklerinin, çalışma yaşamına hazırlığının değerlendirilmesi ve geliştirilmesinde kullanılmaktadır.",
              en: "Graduate and employer feedback is used in evaluating and improving the qualifications of graduates and their readiness for working life.",
            },
          ],
          evidence: {
            tr: "Öğrenci memnuniyet anketleri, ders değerlendirme anketleri, mezun anketleri, işveren anketleri, dış paydaş görüşleri, danışma kurulu tutanakları, odak grup kayıtları, geri bildirim analiz raporları",
            en: "Student satisfaction surveys, course evaluation surveys, graduate surveys, employer surveys, external stakeholder opinions, advisory board minutes, focus group records, feedback analysis reports",
          },
          suggestions: {
            tr: ["Öğrenci memnuniyet anketleri", "Ders değerlendirme anketleri", "Mezun anketleri", "Işveren anketleri", "Dış paydaş görüşleri", "Danışma kurulu tutanakları", "Odak grup kayıtları", "Geri bildirim analiz raporları"],
            en: ["Student satisfaction surveys", "Course evaluation surveys", "Graduate surveys", "Employer surveys", "External stakeholder opinions", "Advisory board minutes", "Focus group records", "Feedback analysis reports"],
          },
        },
        {
          code: "7.4",
          text: {
            tr: "Programda veriye dayalı karar alma ve program iyileştirme mekanizmaları işletilir.",
            en: "Data-driven decision-making and programme improvement mechanisms are operated in the programme.",
          },
          rubric: "B.1.5",
          rubrics: ["A.1.4", "A.2.3", "B.1.5"],
          indicators: [
            {
              tr: "Program düzeyinde toplanan ve analiz edilen veriler akademik kurullar, kalite komisyonları, danışma kurulları veya ilgili karar mekanizmalarında ele alınmaktadır.",
              en: "The data collected and analysed at programme level are considered in academic boards, quality committees, advisory boards or relevant decision-making mechanisms.",
            },
            {
              tr: "Programla ilgili kararlar; öğrenci verileri, başarı göstergeleri, paydaş geri bildirimleri ve program değerlendirme sonuçlarına dayandırılmaktadır.",
              en: "Decisions concerning the programme are based on student data, achievement indicators, stakeholder feedback and programme evaluation results.",
            },
            {
              tr: "Veri analizlerinden hareketle program tasarımı, ders içerikleri, öğretim yöntemleri, ölçme-değerlendirme, öğrenci desteği veya kaynak kullanımı alanlarında iyileştirme kararları alınmaktadır.",
              en: "On the basis of data analyses, improvement decisions are taken in the areas of programme design, course content, teaching methods, assessment, student support or resource use.",
            },
            {
              tr: "İyileştirme kararlarının sorumluları, takvimi, beklenen çıktıları ve izlenme biçimi tanımlanmaktadır.",
              en: "The responsible parties, timetable, expected outputs and monitoring arrangements for improvement decisions are defined.",
            },
          ],
          evidence: {
            tr: "Kurul/komisyon toplantı tutanakları, veri analizine dayalı kararlar, iyileştirme planları, aksiyon takip tabloları, sorumluluk ve takvimlendirme kayıtları, iyileştirme uygulama kanıtları",
            en: "Board/committee meeting minutes, decisions based on data analysis, improvement plans, action tracking tables, records of responsibilities and scheduling, evidence of improvement implementation",
          },
          suggestions: {
            tr: ["Kurul/komisyon toplantı tutanakları", "Veri analizine dayalı kararlar", "Iyileştirme planları", "Aksiyon takip tabloları", "Sorumluluk ve takvimlendirme kayıtları", "Iyileştirme uygulama kanıtları"],
            en: ["Board/committee meeting minutes", "Decisions based on data analysis", "Improvement plans", "Action tracking tables", "Records of responsibilities and scheduling", "Evidence of improvement implementation"],
          },
        },
        {
          code: "7.5",
          text: {
            tr: "Alınan iyileştirme kararlarının sonuçları izlenir ve etkililiği değerlendirilir.",
            en: "The results of improvement decisions taken are monitored and their effectiveness is evaluated.",
          },
          rubric: "B.1.6",
          rubrics: ["A.2.1", "A.3.1", "A.3.4"],
          indicators: [
            {
              tr: "Program düzeyinde gerçekleştirilen iyileştirmelerin uygulanma durumu takip edilmektedir.",
              en: "The implementation status of improvements carried out at programme level is monitored.",
            },
            {
              tr: "Yapılan iyileştirmelerin öğrenci başarısı, öğrenci memnuniyeti, ders işleyişi, mezuniyet, destek hizmetleri veya öğrenme ortamı üzerindeki etkileri değerlendirilmektedir.",
              en: "The effects of the improvements made on student achievement, student satisfaction, the conduct of courses, graduation, support services or the learning environment are evaluated.",
            },
            {
              tr: "Önceki değerlendirme, akreditasyon, iç değerlendirme veya paydaş geri bildirimlerinden kaynaklanan gelişmeye açık alanlar için ilerleme durumu izlenmektedir.",
              en: "Progress is monitored for areas open to improvement arising from previous evaluations, accreditation, internal evaluation or stakeholder feedback.",
            },
            {
              tr: "İyileştirme sonuçları ilgili iç ve dış paydaşlarla uygun şekilde paylaşılmaktadır.",
              en: "The results of improvements are shared appropriately with relevant internal and external stakeholders.",
            },
          ],
          evidence: {
            tr: "İyileştirme takip tabloları, faaliyet raporları, önceki/sonraki karşılaştırmalar, etki değerlendirme raporları, güncellenmiş müfredat/ders bilgi paketi örnekleri, paydaş bilgilendirme kayıtları",
            en: "Improvement tracking tables, activity reports, before/after comparisons, impact evaluation reports, samples of updated curricula/course information packages, stakeholder information records",
          },
          suggestions: {
            tr: ["İyileştirme takip tabloları", "Faaliyet raporları", "Önceki/sonraki karşılaştırmalar", "Etki değerlendirme raporları", "Güncellenmiş müfredat/ders bilgi paketi örnekleri", "Paydaş bilgilendirme kayıtları"],
            en: ["Improvement tracking tables", "Activity reports", "Before/after comparisons", "Impact evaluation reports", "Samples of updated curricula/course information packages", "Stakeholder information records"],
          },
        },
        {
          code: "7.6",
          text: {
            tr: "Program bilgi yönetimi süreçlerinde veri güvenliği, gizlilik ve etik ilkeler gözetilir.",
            en: "Data security, confidentiality and ethical principles are observed in the programme's information management processes.",
          },
          rubric: "A.3.1",
          rubrics: ["A.1.5", "A.3.1"],
          indicators: [
            {
              tr: "Program düzeyinde kullanılan öğrenci, mezun, personel ve paydaş verilerinin gizliliği ve güvenliği gözetilmektedir.",
              en: "The confidentiality and security of student, graduate, staff and stakeholder data used at programme level are observed.",
            },
            {
              tr: "Anket, görüşme, odak grup, öğrenci performans verisi veya mezun izleme verileri kullanılırken etik ilkeler ve kişisel verilerin korunmasına ilişkin kurallar dikkate alınmaktadır.",
              en: "Ethical principles and rules on the protection of personal data are taken into account when using survey, interview, focus group, student performance or graduate tracking data.",
            },
            {
              tr: "Program kapsamında raporlanan veriler, kişisel verilerin korunması, anonimleştirme ve ayrımcılığın önlenmesi ilkeleri doğrultusunda analiz edilmekte ve sunulmaktadır.",
              en: "Data reported within the scope of the programme are analysed and presented in line with the principles of protection of personal data, anonymisation and prevention of discrimination.",
            },
          ],
          evidence: {
            tr: "Veri güvenliği politikaları, KVKK uyum belgeleri, yetkilendirme kayıtları, anket bilgilendirme metinleri, anonimleştirilmiş raporlar, veri erişim yetkileri, etik kurul veya ilgili izin belgeleri",
            en: "Data security policies, personal data protection compliance documents, authorisation records, survey information texts, anonymised reports, data access permissions, ethics committee or related permission documents",
          },
          suggestions: {
            tr: ["Veri güvenliği politikaları", "KVKK uyum belgeleri", "Yetkilendirme kayıtları", "Anket bilgilendirme metinleri", "Anonimleştirilmiş raporlar", "Veri erişim yetkileri", "Etik kurul veya ilgili izin belgeleri"],
            en: ["Data security policies", "Personal data protection compliance documents", "Authorisation records", "Survey information texts", "Anonymised reports", "Data access permissions", "Ethics committee or related permission documents"],
          },
        },
      ],
    },
    {
      no: 8,
      code: "8",
      title: { tr: "Kamuoyunu Bilgilendirme ve Şeffaflık", en: "Public Information and Transparency" },
      subs: [
        {
          code: "8.1",
          text: {
            tr: "Program bilgileri kamuoyuna açık, doğru, güncel ve erişilebilir biçimde sunulur.",
            en: "Programme information is presented to the public in an open, accurate, up-to-date and accessible manner.",
          },
          rubric: "A.1.5",
          rubrics: ["A.1.5", "B.1.1", "B.1.3"],
          indicators: [
            {
              tr: "Programın adı, düzeyi, süresi, öğretim dili, kontenjanı, derece türü, bağlı olduğu akademik birim ve programın genel tanıtımı kamuoyuna açık biçimde yayımlanmaktadır.",
              en: "The name, level, duration, language of instruction, quota, degree type, the academic unit to which the programme is attached and the general presentation of the programme are published openly to the public.",
            },
            {
              tr: "Program bilgileri doğru, güncel, tutarlı ve kolay erişilebilir biçimde sunulmaktadır.",
              en: "Programme information is presented in an accurate, up-to-date, consistent and easily accessible manner.",
            },
            {
              tr: "Kamuoyuna sunulan bilgiler farklı hedef grupların, özellikle aday öğrenciler, mevcut öğrenciler, mezunlar ve işverenlerin ihtiyaçları dikkate alınarak düzenlenmiştir.",
              en: "The information presented to the public is organised taking into account the needs of different target groups, particularly prospective students, current students, graduates and employers.",
            },
          ],
          evidence: {
            tr: "Program web sayfası, program tanıtım metinleri, YÖKSİS bilgileri, tercih/kayıt kılavuzu bilgileri, fakülte/yüksekokul/bölüm sayfaları, güncelleme kayıtları",
            en: "Programme web page, programme introduction texts, YÖKSİS information, preference/registration guide information, faculty/school/department pages, update records",
          },
          suggestions: {
            tr: ["Program web sayfası", "Program tanıtım metinleri", "YÖKSİS bilgileri", "Tercih/kayıt kılavuzu bilgileri", "Fakülte/yüksekokul/bölüm sayfaları", "Güncelleme kayıtları"],
            en: ["Programme web page", "Programme introduction texts", "YÖKSİS information", "Preference/registration guide information", "Faculty/school/department pages", "Update records"],
          },
        },
        {
          code: "8.2",
          text: {
            tr: "Program amaçları, öğrenme çıktıları ve yeterlilikleri açık biçimde yayımlanır.",
            en: "The programme's aims, learning outcomes and qualifications are published clearly.",
          },
          rubric: "A.1.5",
          rubrics: ["A.1.5", "B.1.2", "B.1.4", "B.2.2"],
          indicators: [
            {
              tr: "Program amaçları, mezun profili, program öğrenme çıktıları ve kazandırılan yeterlilikler kamuoyuna açık biçimde paylaşılmaktadır.",
              en: "The programme's aims, graduate profile, programme learning outcomes and the qualifications awarded are shared openly with the public.",
            },
            {
              tr: "Program öğrenme çıktıları, ilgili yeterlilik düzeyi ve mezunların sahip olması beklenen bilgi, beceri ve yetkinliklerle ilişkilendirilerek sunulmaktadır.",
              en: "Programme learning outcomes are presented in relation to the relevant qualification level and to the knowledge, skills and competences graduates are expected to possess.",
            },
            {
              tr: "Programın mezunlara sunduğu akademik ilerleme, mesleki uygulama ve istihdam olanaklarına ilişkin bilgiler açık ve yanıltıcı olmayan biçimde yayımlanmaktadır.",
              en: "Information on the opportunities for academic progression, professional practice and employment offered to graduates by the programme is published in a clear and non-misleading manner.",
            },
          ],
          evidence: {
            tr: "Program amaçları, öğrenme çıktıları, mezun profili, yeterlilikler matrisi, ders bilgi paketleri, TYÇ uyum bilgileri, program tanıtım dokümanları",
            en: "Programme aims, learning outcomes, graduate profile, qualifications matrix, course information packages, TQF alignment information, programme introduction documents",
          },
          suggestions: {
            tr: ["Program amaçları", "Öğrenme çıktıları", "Mezun profili", "Yeterlilikler matrisi", "Ders bilgi paketleri", "TYÇ uyum bilgileri", "Program tanıtım dokümanları"],
            en: ["Programme aims", "Learning outcomes", "Graduate profile", "Qualifications matrix", "Course information packages", "TQF alignment information", "Programme introduction documents"],
          },
        },
        {
          code: "8.3",
          text: {
            tr: "Dersler, öğretim yöntemleri, ölçme-değerlendirme ve öğrenci iş yüküne ilişkin bilgiler erişilebilirdir.",
            en: "Information on courses, teaching methods, assessment and student workload is accessible.",
          },
          rubric: "B.1.4",
          rubrics: ["A.1.5", "B.2.3", "B.2.4"],
          indicators: [
            {
              tr: "Programdaki derslerin içerikleri, ders öğrenme çıktıları, AKTS kredileri, öğrenci iş yükü, ön koşullar ve dersin program çıktılarıyla ilişkisi yayımlanmaktadır.",
              en: "The content of the courses in the programme, course learning outcomes, ECTS credits, student workload, prerequisites and the relationship of the course with programme outcomes are published.",
            },
            {
              tr: "Öğretim türü ile ölçme-değerlendirme yöntemleri öğrenciler ve ilgili paydaşlar için erişilebilir durumdadır.",
              en: "The mode of teaching and assessment methods are accessible to students and relevant stakeholders.",
            },
            {
              tr: "Ders bilgi paketleri programın güncel müfredatıyla uyumlu, anlaşılır ve düzenli olarak güncellenmiş biçimde sunulmaktadır.",
              en: "Course information packages are presented in a manner consistent with the programme's current curriculum, understandable and regularly updated.",
            },
          ],
          evidence: {
            tr: "Ders bilgi paketleri, AKTS bilgi paketi, ders izlenceleri, ders-program çıktıları matrisi, ölçme-değerlendirme bilgileri, akademik katalog, öğrenci bilgi sistemi çıktıları",
            en: "Course information packages, ECTS information package, course syllabi, course-programme outcomes matrix, assessment information, academic catalogue, student information system outputs",
          },
          suggestions: {
            tr: ["Ders bilgi paketleri", "AKTS bilgi paketi", "Ders izlenceleri", "Ders-program çıktıları matrisi", "Ölçme-değerlendirme bilgileri", "Akademik katalog", "Öğrenci bilgi sistemi çıktıları"],
            en: ["Course information packages", "ECTS information package", "Course syllabi", "Course-programme outcomes matrix", "Assessment information", "Academic catalogue", "Student information system outputs"],
          },
        },
        {
          code: "8.4",
          text: {
            tr: "Öğrenme kaynakları, öğrenci destek hizmetleri ve başvuru yolları hakkında bilgi sağlanır.",
            en: "Information is provided about learning resources, student support services and application channels.",
          },
          rubric: "A.1.5",
          rubrics: ["A.1.4", "A.1.5", "B.1.5"],
          indicators: [
            {
              tr: "Öğrencilere sunulan akademik danışmanlık, kariyer hizmetleri, psikolojik danışmanlık, engelli öğrenci desteği, kütüphane, dijital kaynaklar ve diğer destek hizmetleri hakkında bilgiler yayımlanmaktadır.",
              en: "Information about the academic advising, career services, psychological counselling, disability support, library, digital resources and other support services offered to students is published.",
            },
            {
              tr: "Öğrenci şikâyet, itiraz, öneri ve başvuru yolları açık, görünür ve erişilebilir biçimde duyurulmaktadır.",
              en: "Student complaint, appeal, suggestion and application channels are announced clearly, visibly and accessibly.",
            },
            {
              tr: "Öğrenme kaynakları ve destek hizmetlerine erişim bilgileri farklı öğrenci gruplarının ihtiyaçları dikkate alınarak sunulmaktadır.",
              en: "Information on access to learning resources and support services is presented taking into account the needs of different student groups.",
            },
          ],
          evidence: {
            tr: "Öğrenci destek hizmetleri sayfaları, danışmanlık duyuruları, kariyer merkezi bilgileri, kütüphane ve veri tabanı tanıtımları, engelli öğrenci birimi bilgileri, destek hizmet başvuru formları",
            en: "Student support service pages, advising announcements, career centre information, library and database introductions, disability support unit information, support service application forms",
          },
          suggestions: {
            tr: ["Öğrenci destek hizmetleri sayfaları", "Danışmanlık duyuruları", "Kariyer merkezi bilgileri", "Kütüphane ve veri tabanı tanıtımları", "Engelli öğrenci birimi bilgileri", "Destek hizmet başvuru formları"],
            en: ["Student support service pages", "Advising announcements", "Career centre information", "Library and database introductions", "Disability support unit information", "Support service application forms"],
          },
        },
        {
          code: "8.5",
          text: {
            tr: "Programın kalite güvencesi süreçleri ve temel çıktıları kamuoyuyla uygun düzeyde paylaşılır.",
            en: "The programme's quality assurance processes and key outputs are shared with the public at an appropriate level.",
          },
          rubric: "A.1.5",
          rubrics: ["A.1.5"],
          indicators: [
            {
              tr: "Programın kalite güvencesi süreçleri, değerlendirme mekanizmaları, paydaş katılımı ve kalite güvencesi kapsamındaki temel çıktıları hakkında kamuoyuna bilgi sunulmaktadır.",
              en: "Information is provided to the public about the programme's quality assurance processes, evaluation mechanisms, stakeholder participation and the key outputs within the scope of quality assurance.",
            },
            {
              tr: "Programın akreditasyon durumu, varsa dış değerlendirme sonuçları ve kalite güvencesi süreçleri sonucunda yapılan temel iyileştirmeler uygun düzeyde yayımlanmaktadır.",
              en: "The accreditation status of the programme, any external evaluation results and the key improvements made as a result of quality assurance processes are published at an appropriate level.",
            },
            {
              tr: "Kalite güvencesine ilişkin bilgiler paylaşılırken kişisel verilerin korunması, gizlilik, etik ilkeler ve yürürlükteki mevzuat hükümleri gözetilmektedir.",
              en: "When information concerning quality assurance is shared, the protection of personal data, confidentiality, ethical principles and the provisions of the legislation in force are observed.",
            },
          ],
          evidence: {
            tr: "Program kalite raporları, program değerlendirme özetleri, iç değerlendirme çıktıları, paydaş bilgilendirme metinleri, kalite komisyonu duyuruları, program iyileştirme özetleri",
            en: "Programme quality reports, programme evaluation summaries, internal evaluation outputs, stakeholder information texts, quality committee announcements, programme improvement summaries",
          },
          suggestions: {
            tr: ["Program kalite raporları", "Program değerlendirme özetleri", "Iç değerlendirme çıktıları", "Paydaş bilgilendirme metinleri", "Kalite komisyonu duyuruları", "Program iyileştirme özetleri"],
            en: ["Programme quality reports", "Programme evaluation summaries", "Internal evaluation outputs", "Stakeholder information texts", "Quality committee announcements", "Programme improvement summaries"],
          },
        },
        {
          code: "8.6",
          text: {
            tr: "Kamuoyuna sunulan bilgiler nesnel, tutarlı ve yanıltıcı olmayan bir dille hazırlanır.",
            en: "Information presented to the public is prepared in objective, consistent and non-misleading language.",
          },
          rubric: "A.1.5",
          rubrics: ["A.1.5", "A.3.4"],
          indicators: [
            {
              tr: "Program tanıtımlarında kullanılan bilgiler doğrulanabilir, nesnel ve programın gerçek koşullarıyla uyumludur.",
              en: "The information used in programme promotion is verifiable, objective and consistent with the actual conditions of the programme.",
            },
            {
              tr: "Programın başarıları, olanakları, mezun istihdamı, akreditasyon durumu veya uluslararasılaşma bilgileri abartılı ya da yanıltıcı olmayan biçimde sunulmaktadır.",
              en: "Information on the programme's achievements, facilities, graduate employment, accreditation status or internationalisation is presented in a manner that is neither exaggerated nor misleading.",
            },
            {
              tr: "Farklı platformlarda yayımlanan program bilgileri arasında tutarlılık sağlanmaktadır.",
              en: "Consistency is ensured between the programme information published on different platforms.",
            },
          ],
          evidence: {
            tr: "Web içerik kontrol kayıtları, tanıtım materyalleri, kataloglar, sosyal medya duyuruları, kalite güvencesi kontrol listeleri, içerik onay süreçleri, güncelleme sorumlulukları",
            en: "Web content control records, promotional materials, catalogues, social media announcements, quality assurance checklists, content approval processes, update responsibilities",
          },
          suggestions: {
            tr: ["Web içerik kontrol kayıtları", "Tanıtım materyalleri", "Kataloglar", "Sosyal medya duyuruları", "Kalite güvencesi kontrol listeleri", "Içerik onay süreçleri", "Güncelleme sorumlulukları"],
            en: ["Web content control records", "Promotional materials", "Catalogues", "Social media announcements", "Quality assurance checklists", "Content approval processes", "Update responsibilities"],
          },
        },
        {
          code: "8.7",
          text: {
            tr: "Kamuoyunu bilgilendirme süreçlerinin sorumlulukları ve güncelleme mekanizmaları tanımlıdır.",
            en: "The responsibilities and update mechanisms of the public information processes are defined.",
          },
          rubric: "A.3.4",
          rubrics: ["A.1.4", "A.1.5", "B.1.5", "B.1.6"],
          indicators: [
            {
              tr: "Program bilgilerinin hazırlanması, onaylanması, yayımlanması ve güncellenmesine ilişkin görev ve sorumluluklar tanımlanmıştır.",
              en: "The duties and responsibilities for preparing, approving, publishing and updating programme information are defined.",
            },
            {
              tr: "Program web sayfası, ders bilgi paketleri, tanıtım materyalleri ve kamuoyu bilgilendirme içerikleri düzenli olarak gözden geçirilmektedir.",
              en: "The programme web page, course information packages, promotional materials and public information content are reviewed regularly.",
            },
            {
              tr: "Güncel olmayan, eksik veya hatalı bilgilerin düzeltilmesine yönelik işleyen bir mekanizma bulunmaktadır.",
              en: "A functioning mechanism is in place for correcting out-of-date, incomplete or erroneous information.",
            },
          ],
          evidence: {
            tr: "Web güncelleme sorumluları, içerik onay süreçleri, güncelleme takvimleri, bölüm/program kurulu kararları, kalite komisyonu kayıtları, web sayfası güncelleme kayıtları",
            en: "Web update officers, content approval processes, update calendars, department/programme board decisions, quality committee records, web page update records",
          },
          suggestions: {
            tr: ["Web güncelleme sorumluları", "Içerik onay süreçleri", "Güncelleme takvimleri", "Bölüm/program kurulu kararları", "Kalite komisyonu kayıtları", "Web sayfası güncelleme kayıtları"],
            en: ["Web update officers", "Content approval processes", "Update calendars", "Department/programme board decisions", "Quality committee records", "Web page update records"],
          },
        },
      ],
    },
    {
      no: 9,
      code: "9",
      title: { tr: "Dış Kalite Güvencesi (Kurumsal ve/veya Program) ve Akreditasyon Döngüsü", en: "External Quality Assurance (Institutional and/or Programme) and the Accreditation Cycle" },
      subs: [
        {
          code: "9.1",
          text: {
            tr: "Program, dış kalite güvencesi (kurumsal ve/veya program) ve akreditasyon süreçlerine ilişkin yükümlülüklerini tanımlar ve takip eder.",
            en: "The programme defines and follows up its obligations concerning external quality assurance (institutional and/or programme) and accreditation processes.",
          },
          rubric: "",
          rubrics: ["A.1.4", "A.3.1", "B.1.5"],
          indicators: [
            {
              tr: "Program, dış kalite güvencesi (kurumsal ve/veya program) ve akreditasyon süreçlerinde kendi görev, sorumluluk, takvim, kanıt hazırlığı ve iyileştirme izleme yükümlülüklerini tanımlar ve kurumsal süreçlerle ilişkilendirir.",
              en: "The programme defines its duties, responsibilities, timetable, evidence preparation and improvement monitoring obligations in external quality assurance (institutional and/or programme) and accreditation processes, and relates them to institutional processes.",
            },
            {
              tr: "Program, dış kalite güvencesi (kurumsal ve/veya program) süreçlerine ilişkin kurumsal ve program düzeyindeki gereklilikleri düzenli olarak takip etmektedir.",
              en: "The programme regularly follows the institutional and programme-level requirements concerning external quality assurance (institutional and/or programme) processes.",
            },
          ],
          evidence: {
            tr: "Akreditasyon takvimi, dış değerlendirme süreç planı, YÖKAK başvuru ve izleme yazışmaları, program akreditasyonu kararları, iç yazışmalar, kalite komisyonu kararları",
            en: "Accreditation calendar, external evaluation process plan, YÖKAK application and monitoring correspondence, programme accreditation decisions, internal correspondence, quality committee decisions",
          },
          suggestions: {
            tr: ["Akreditasyon takvimi", "Dış değerlendirme süreç planı", "YÖKAK başvuru ve izleme yazışmaları", "Program akreditasyonu kararları", "Iç yazışmalar", "Kalite komisyonu kararları"],
            en: ["Accreditation calendar", "External evaluation process plan", "YÖKAK application and monitoring correspondence", "Programme accreditation decisions", "Internal correspondence", "Quality committee decisions"],
          },
        },
        {
          code: "9.2",
          text: {
            tr: "Program, dış değerlendirme (kurumsal ve/veya program) ve akreditasyon süreçlerine kanıta dayalı biçimde hazırlanır.",
            en: "The programme prepares for external evaluation (institutional and/or programme) and accreditation processes on an evidence-based basis.",
          },
          rubric: "",
          rubrics: ["A.1.4", "A.2.3", "B.1.5"],
          indicators: [
            {
              tr: "Program iç değerlendirme, öz değerlendirme veya benzeri hazırlık çalışmalarını ölçütler ve kanıtlar temelinde yürütmektedir.",
              en: "The programme carries out internal evaluation, self-assessment or similar preparatory work on the basis of criteria and evidence.",
            },
            {
              tr: "Dış değerlendirme (kurumsal ve/veya program) sürecinde sunulacak bilgiler, programın mevcut durumunu doğru, bütüncül ve kanıta dayalı biçimde yansıtmaktadır.",
              en: "The information to be presented in the external evaluation (institutional and/or programme) process reflects the current situation of the programme accurately, holistically and on an evidence-based basis.",
            },
            {
              tr: "Programın dış değerlendirme (kurumsal ve/veya program) hazırlık sürecine akademik personel, öğrenciler, idari/teknik personel ve ilgili paydaşlar dahil edilmektedir.",
              en: "Academic staff, students, administrative/technical staff and relevant stakeholders are involved in the programme's preparation process for external evaluation (institutional and/or programme).",
            },
          ],
          evidence: {
            tr: "Program İç Değerlendirme Raporu, öz değerlendirme raporları, kanıt dosyaları, belge listeleri, süreç takvimleri, görev dağılım tabloları, hazırlık toplantısı tutanakları",
            en: "Programme Internal Evaluation Report, self-assessment reports, evidence files, document lists, process calendars, task allocation tables, preparatory meeting minutes",
          },
          suggestions: {
            tr: ["Program İç Değerlendirme Raporu", "Öz değerlendirme raporları", "Kanıt dosyaları", "Belge listeleri", "Süreç takvimleri", "Görev dağılım tabloları", "Hazırlık toplantısı tutanakları"],
            en: ["Programme Internal Evaluation Report", "Self-assessment reports", "Evidence files", "Document lists", "Process calendars", "Task allocation tables", "Preparatory meeting minutes"],
          },
        },
        {
          code: "9.3",
          text: {
            tr: "Dış değerlendirme (kurumsal ve/veya program) raporları, kararları ve gelişmeye açık alanlar program düzeyinde ele alınır.",
            en: "External evaluation (institutional and/or programme) reports, decisions and areas open to improvement are addressed at programme level.",
          },
          rubric: "",
          rubrics: ["A.1.4", "A.2.3", "B.1.5"],
          indicators: [
            {
              tr: "Dış değerlendirme (kurumsal ve/veya program), akreditasyon, izleme veya ara değerlendirme raporlarında yer alan güçlü yönler ve gelişmeye açık alanlar programın ilgili kurulunda ele alınmaktadır.",
              en: "The strengths and areas open to improvement contained in external evaluation (institutional and/or programme), accreditation, monitoring or interim evaluation reports are addressed in the relevant board of the programme.",
            },
            {
              tr: "Dış değerlendirme (kurumsal ve/veya program) sonuçları programın kalite güvencesi, müfredat, öğrenme-öğretme, ölçme-değerlendirme, öğrenci desteği ve kaynak yönetimi süreçleriyle ilişkilendirilmektedir.",
              en: "External evaluation (institutional and/or programme) results are related to the programme's quality assurance, curriculum, learning and teaching, assessment, student support and resource management processes.",
            },
            {
              tr: "Dış değerlendirme (kurumsal ve/veya program) bulguları yalnızca raporlanmakla kalmayıp program gelişimi için somut karar ve eylemlere dönüştürülmektedir.",
              en: "External evaluation (institutional and/or programme) findings are not merely reported but converted into concrete decisions and actions for the development of the programme.",
            },
          ],
          evidence: {
            tr: "Dış değerlendirme (kurumsal ve/veya program) raporları, akreditasyon kararları, izleme raporları, gelişmeye açık alan listeleri, kurul/komisyon tutanakları, aksiyon planları, sorumluluk ve takvimlendirme kayıtları,eyleme geçildiğine dair kanıtlar",
            en: "External evaluation (institutional and/or programme) reports, accreditation decisions, monitoring reports, lists of areas open to improvement, board/committee minutes, action plans, records of responsibilities and scheduling, evidence that action has been taken",
          },
          suggestions: {
            tr: ["Dış değerlendirme (kurumsal ve/veya program) raporları", "Akreditasyon kararları", "Izleme raporları", "Gelişmeye açık alan listeleri", "Kurul/komisyon tutanakları", "Aksiyon planları", "Sorumluluk ve takvimlendirme kayıtları", "Eyleme geçildiğine dair kanıtlar"],
            en: ["External evaluation (institutional and/or programme) reports", "Accreditation decisions", "Monitoring reports", "Lists of areas open to improvement", "Board/committee minutes", "Action plans", "Records of responsibilities and scheduling", "Evidence that action has been taken"],
          },
        },
        {
          code: "9.4",
          text: {
            tr: "Program, dış kalite güvencesi (kurumsal ve/veya program) süreçlerinden doğan iyileştirme eylemlerini izler.",
            en: "The programme monitors the improvement actions arising from external quality assurance (institutional and/or programme) processes.",
          },
          optional: true,
          scopeNote: {
            tr: "İlk defa dış değerlendirmeye giren programlar için geçerli değildir.",
            en: "Does not apply to programmes undergoing external evaluation for the first time.",
          },
          rubric: "",
          rubrics: ["A.1.5", "A.4.1", "B.1.5"],
          indicators: [
            {
              tr: "Dış değerlendirme (kurumsal ve/veya program) sonucunda belirlenen gelişmeye açık alanlar için eylem planı, sorumlular, takvim ve beklenen çıktılar tanımlanmaktadır.",
              en: "An action plan, responsible parties, timetable and expected outputs are defined for the areas open to improvement identified as a result of external evaluation (institutional and/or programme).",
            },
            {
              tr: "Dış değerlendirme (kurumsal ve/veya program) sonrası alınan kararların uygulanma durumu program düzeyinde takip edilmektedir.",
              en: "The implementation status of the decisions taken following external evaluation (institutional and/or programme) is followed up at programme level.",
            },
            {
              tr: "Gerçekleştirilen iyileştirmelerin programın işleyişine, öğrenci deneyimine, öğrenme çıktılarının kazanımına veya kalite güvencesi süreçlerine etkisi değerlendirilmektedir.",
              en: "The effect of the improvements carried out on the operation of the programme, the student experience, the achievement of learning outcomes or quality assurance processes is evaluated.",
            },
          ],
          evidence: {
            tr: "İyileştirme eylem planları, izleme tabloları, sorumlu birim/kişi kayıtları, faaliyet raporları, ilerleme raporları, önceki-sonraki karşılaştırmalar, güncellenmiş program belgeleri",
            en: "Improvement action plans, monitoring tables, records of responsible units/persons, activity reports, progress reports, before-and-after comparisons, updated programme documents",
          },
          suggestions: {
            tr: ["İyileştirme eylem planları", "Izleme tabloları", "Sorumlu birim/kişi kayıtları", "Faaliyet raporları", "Ilerleme raporları", "Önceki-sonraki karşılaştırmalar", "Güncellenmiş program belgeleri"],
            en: ["Improvement action plans", "Monitoring tables", "Records of responsible units/persons", "Activity reports", "Progress reports", "Before-and-after comparisons", "Updated programme documents"],
          },
        },
      ],
    },
  ];

  /* --------------------------------------------------------------------
     Türetilen dizinler / derived indexes
     -------------------------------------------------------------------- */
  var subIndex = {};
  var mainIndex = {};
  criteria.forEach(function (main) {
    mainIndex[main.code] = main;
    main.subs.forEach(function (sub) {
      sub.main = main;
      subIndex[sub.code] = sub;
    });
  });

  var allSubs = criteria.reduce(function (acc, main) {
    return acc.concat(main.subs);
  }, []);

  return {
    version: "2026-programme-criteria",
    complianceScale: complianceScale,
    criteria: criteria,
    subs: allSubs,
    /** Alt ölçüt kaydı (ör. "3.5"). */
    bySubCode: function (code) {
      return subIndex[code] || null;
    },
    /** Ana ölçüt kaydı (ör. "3"). */
    byMainCode: function (code) {
      return mainIndex[code] || null;
    },
    /** Uyum ölçeği kaydı. */
    compliance: function (value) {
      for (var i = 0; i < complianceScale.length; i++) {
        if (complianceScale[i].value === value) return complianceScale[i];
      }
      return null;
    },
    /** Bir alt ölçütte seçilebilecek uyum düzeyleri. */
    scaleFor: function (sub) {
      return complianceScale.filter(function (c) {
        return !c.optionalOnly || (sub && sub.optional);
      });
    },
  };
})();
