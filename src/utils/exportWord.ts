import {
  Document,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  WidthType,
  AlignmentType,
  BorderStyle,
  HeadingLevel,
  Packer
} from 'docx';
import { saveAs } from 'file-saver';
import { PPMDocument } from '../types';

const BORDER_STYLE = {
  style: BorderStyle.SINGLE,
  size: 6,
  color: '94A3B8'
};

const TABLE_BORDERS = {
  top: BORDER_STYLE,
  bottom: BORDER_STYLE,
  left: BORDER_STYLE,
  right: BORDER_STYLE,
  insideHorizontal: BORDER_STYLE,
  insideVertical: BORDER_STYLE
};

function createHeaderCell(text: string, widthPercent: number): TableCell {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    shading: { fill: '1E3A8A' }, // Deep Education Blue
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 120, after: 120 },
        children: [
          new TextRun({
            text,
            bold: true,
            color: 'FFFFFF',
            font: 'Arial',
            size: 20 // 10pt
          })
        ]
      })
    ]
  });
}

function createSubheaderCell(text: string, widthPercent: number): TableCell {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    shading: { fill: 'F1F5F9' },
    children: [
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [
          new TextRun({
            text,
            bold: true,
            color: '0F172A',
            font: 'Arial',
            size: 20
          })
        ]
      })
    ]
  });
}

function createTextCell(text: string, widthPercent: number, isBold: boolean = false, align: (typeof AlignmentType)[keyof typeof AlignmentType] = AlignmentType.LEFT): TableCell {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    children: [
      new Paragraph({
        alignment: align,
        spacing: { before: 80, after: 80 },
        children: [
          new TextRun({
            text,
            bold: isBold,
            color: '1E293B',
            font: 'Arial',
            size: 20
          })
        ]
      })
    ]
  });
}

export async function exportPPMToWord(docData: PPMDocument, paperSize: 'A4' | 'F4' = 'A4') {
  const { identitas, identifikasi, desainPembelajaran, pengalamanBelajar, asesmenPembelajaran, tandaTangan } = docData;

  const isF4 = paperSize === 'F4';
  const pageWidth = isF4 ? 12189 : 11906; // F4: 215mm x 330mm, A4: 210mm x 297mm in twips
  const pageHeight = isF4 ? 18709 : 16838;
  const marginLeft = 1417; // 2.5 cm for binder margin
  const marginRight = 1134; // 2 cm
  const marginTop = 1134; // 2 cm
  const marginBottom = 1134; // 2 cm
  const contentWidth = pageWidth - (marginLeft + marginRight); // ~9355 for A4, ~9638 for F4

  // Helper column widths in twips for 100% full-width tables
  const col2Identitas = [Math.round(contentWidth * 0.3), contentWidth - Math.round(contentWidth * 0.3)];
  const col2Identifikasi = [Math.round(contentWidth * 0.3), contentWidth - Math.round(contentWidth * 0.3)];
  const col2Desain = [Math.round(contentWidth * 0.3), contentWidth - Math.round(contentWidth * 0.3)];
  const col2Pengalaman = [Math.round(contentWidth * 0.28), contentWidth - Math.round(contentWidth * 0.28)];
  const col3Asesmen = [
    Math.round(contentWidth * 0.25),
    Math.round(contentWidth * 0.38),
    contentWidth - Math.round(contentWidth * 0.25) - Math.round(contentWidth * 0.38)
  ];
  const rCol1 = Math.round(contentWidth * 0.24);
  const rColOthers = Math.round(contentWidth * 0.19);
  const col5Rubrik = [rCol1, rColOthers, rColOthers, rColOthers, contentWidth - rCol1 - (rColOthers * 3)];
  const col2Sign = [Math.round(contentWidth * 0.5), contentWidth - Math.round(contentWidth * 0.5)];

  const doc = new Document({
    creator: 'Ahmad Yurid Ardiansah, S.Pd.',
    title: docData.title,
    description: `Perencanaan Pembelajaran Mendalam (PPM) - Format ${paperSize} Generator PPM Pro Premium`,
    sections: [
      {
        properties: {
          page: {
            size: {
              width: pageWidth,
              height: pageHeight
            },
            margin: {
              top: marginTop,
              right: marginRight,
              bottom: marginBottom,
              left: marginLeft
            }
          }
        },
        children: [
          // Header Judul Dokumen
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 100 },
            children: [
              new TextRun({
                text: 'PERENCANAAN PEMBELAJARAN MENDALAM (PPM)',
                bold: true,
                font: 'Arial',
                size: 26, // 13pt
                color: '1E3A8A'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 200 },
            children: [
              new TextRun({
                text: `${identitas.mataPelajaran.toUpperCase()} — ${identitas.kelas.toUpperCase()} — SEMESTER ${identitas.semester.toUpperCase()}`,
                bold: true,
                font: 'Arial',
                size: 22,
                color: '334155'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 300 },
            children: [
              new TextRun({
                text: `${identitas.namaSatuanPendidikan} | Tahun Pelajaran ${identitas.tahunPelajaran}`,
                font: 'Arial',
                size: 18,
                color: '64748B'
              })
            ]
          }),

          // ==================== TABEL 1 ====================
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 240, after: 120 },
            children: [
              new TextRun({
                text: 'TABEL 1 — IDENTITAS',
                bold: true,
                font: 'Arial',
                size: 22,
                color: '1E3A8A'
              })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            columnWidths: col2Identitas,
            borders: TABLE_BORDERS,
            rows: [
              new TableRow({
                children: [
                  createTextCell('A. Nama Satuan Pendidikan', 30, true),
                  createTextCell(identitas.namaSatuanPendidikan, 70)
                ]
              }),
              new TableRow({
                children: [
                  createTextCell('B. Mata Pelajaran', 30, true),
                  createTextCell(identitas.mataPelajaran, 70)
                ]
              }),
              new TableRow({
                children: [
                  createTextCell('C. Kelas / Semester', 30, true),
                  createTextCell(`${identitas.kelas} / ${identitas.semester}`, 70)
                ]
              }),
              new TableRow({
                children: [
                  createTextCell('D. Materi Pelajaran', 30, true),
                  createTextCell(identitas.materiPelajaran || docData.title, 70)
                ]
              }),
              new TableRow({
                children: [
                  createTextCell('E. Durasi Pertemuan', 30, true),
                  createTextCell(`${pengalamanBelajar.length} Pertemuan (${identitas.durasiPertemuan || '2 x 40 menit'})`, 70)
                ]
              }),
              new TableRow({
                children: [
                  createTextCell('F. Tahun Pelajaran', 30, true),
                  createTextCell(identitas.tahunPelajaran, 70)
                ]
              })
            ]
          }),

          // ==================== TABEL 2 ====================
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 360, after: 120 },
            children: [
              new TextRun({
                text: 'TABEL 2 — IDENTIFIKASI',
                bold: true,
                font: 'Arial',
                size: 22,
                color: '1E3A8A'
              })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            columnWidths: col2Identifikasi,
            borders: TABLE_BORDERS,
            rows: [
              new TableRow({
                children: [
                  createHeaderCell('Komponen Identifikasi', 30),
                  createHeaderCell('Uraian Hasil Identifikasi Pembelajaran', 70)
                ]
              }),
              new TableRow({
                children: [
                  createTextCell('A. Peserta Didik', 30, true),
                  new TableCell({
                    width: { size: 70, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ spacing: { before: 60, after: 60 }, children: [new TextRun({ text: '• Pengetahuan Awal: ', bold: true, font: 'Arial', size: 20 }), new TextRun({ text: identifikasi.pesertaDidik.pengetahuanAwal, font: 'Arial', size: 20 })] }),
                      new Paragraph({ spacing: { before: 60, after: 60 }, children: [new TextRun({ text: '• Kesiapan Belajar: ', bold: true, font: 'Arial', size: 20 }), new TextRun({ text: identifikasi.pesertaDidik.kesiapanBelajar, font: 'Arial', size: 20 })] }),
                      new Paragraph({ spacing: { before: 60, after: 60 }, children: [new TextRun({ text: '• Minat Belajar: ', bold: true, font: 'Arial', size: 20 }), new TextRun({ text: identifikasi.pesertaDidik.minat, font: 'Arial', size: 20 })] }),
                      new Paragraph({ spacing: { before: 60, after: 60 }, children: [new TextRun({ text: '• Latar Belakang: ', bold: true, font: 'Arial', size: 20 }), new TextRun({ text: identifikasi.pesertaDidik.latarBelakang, font: 'Arial', size: 20 })] }),
                      new Paragraph({ spacing: { before: 60, after: 60 }, children: [new TextRun({ text: '• Kebutuhan Belajar: ', bold: true, font: 'Arial', size: 20 }), new TextRun({ text: identifikasi.pesertaDidik.kebutuhanBelajar, font: 'Arial', size: 20 })] }),
                      new Paragraph({ spacing: { before: 60, after: 60 }, children: [new TextRun({ text: '• Perbedaan Kemampuan: ', bold: true, font: 'Arial', size: 20 }), new TextRun({ text: identifikasi.pesertaDidik.kemungkinanPerbedaanKemampuan, font: 'Arial', size: 20 })] })
                    ]
                  })
                ]
              }),
              new TableRow({
                children: [
                  createTextCell('B. Materi Pelajaran', 30, true),
                  createTextCell(identifikasi.materiPelajaran, 70)
                ]
              }),
              new TableRow({
                children: [
                  createTextCell('C. Capaian Dimensi Profil Lulusan', 30, true),
                  new TableCell({
                    width: { size: 70, type: WidthType.PERCENTAGE },
                    children: identifikasi.capaianDimensiProfil.map(
                      (dim) =>
                        new Paragraph({
                          spacing: { before: 60, after: 60 },
                          children: [
                            new TextRun({ text: `• ${dim.dimensi}: `, bold: true, font: 'Arial', size: 20, color: '0369A1' }),
                            new TextRun({ text: dim.relevansi, font: 'Arial', size: 20 })
                          ]
                        })
                    )
                  })
                ]
              })
            ]
          }),

          // ==================== TABEL 3 ====================
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 360, after: 120 },
            children: [
              new TextRun({
                text: 'TABEL 3 — DESAIN PEMBELAJARAN',
                bold: true,
                font: 'Arial',
                size: 22,
                color: '1E3A8A'
              })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            columnWidths: col2Desain,
            borders: TABLE_BORDERS,
            rows: [
              new TableRow({
                children: [
                  createTextCell('A. Capaian Pembelajaran (CP)', 30, true),
                  createTextCell(desainPembelajaran.capaianPembelajaran, 70)
                ]
              }),
              new TableRow({
                children: [
                  createTextCell('B. Lintas Disiplin Ilmu', 30, true),
                  createTextCell(desainPembelajaran.lintasDisiplinIlmu.join('; '), 70)
                ]
              }),
              new TableRow({
                children: [
                  createTextCell('C. Tujuan Pembelajaran (TP)', 30, true),
                  createTextCell(desainPembelajaran.tujuanPembelajaran, 70)
                ]
              }),
              new TableRow({
                children: [
                  createTextCell('D. Topik Pembelajaran', 30, true),
                  createTextCell(desainPembelajaran.topikPembelajaran, 70)
                ]
              }),
              new TableRow({
                children: [
                  createTextCell('E. Praktik Pedagogis per Pertemuan', 30, true),
                  new TableCell({
                    width: { size: 70, type: WidthType.PERCENTAGE },
                    children: desainPembelajaran.praktikPedagogisPerPertemuan.map(
                      (p) =>
                        new Paragraph({
                          spacing: { before: 40, after: 40 },
                          children: [
                            new TextRun({ text: `Pertemuan ${p.pertemuan}: `, bold: true, font: 'Arial', size: 20 }),
                            new TextRun({ text: `${p.model} (${p.subtopik})`, font: 'Arial', size: 20 })
                          ]
                        })
                    )
                  })
                ]
              }),
              new TableRow({
                children: [
                  createTextCell('F. Kemitraan Pembelajaran', 30, true),
                  createTextCell(desainPembelajaran.kemitraanPembelajaran.join(', '), 70)
                ]
              }),
              new TableRow({
                children: [
                  createTextCell('G. Lingkungan Pembelajaran', 30, true),
                  createTextCell(desainPembelajaran.lingkunganPembelajaran.join(', '), 70)
                ]
              }),
              new TableRow({
                children: [
                  createTextCell('H. Pemanfaatan Digital', 30, true),
                  createTextCell(desainPembelajaran.pemanfaatanDigital.join(', '), 70)
                ]
              })
            ]
          }),

          // ==================== TABEL 4 ====================
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 360, after: 120 },
            children: [
              new TextRun({
                text: 'TABEL 4 — PENGALAMAN BELAJAR',
                bold: true,
                font: 'Arial',
                size: 22,
                color: '1E3A8A'
              })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            columnWidths: col2Pengalaman,
            borders: TABLE_BORDERS,
            rows: [
              new TableRow({
                children: [
                  createHeaderCell('Pertemuan & Subtopik', 25),
                  createHeaderCell('Tahapan Pengalaman Belajar (Memahami, Mengaplikasi, Refleksi)', 75)
                ]
              }),
              ...pengalamanBelajar.map((pb) => {
                return new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 25, type: WidthType.PERCENTAGE },
                      children: [
                        new Paragraph({
                          spacing: { before: 60, after: 60 },
                          children: [
                            new TextRun({ text: `PERTEMUAN ${pb.pertemuan}`, bold: true, font: 'Arial', size: 20, color: '1E3A8A' })
                          ]
                        }),
                        new Paragraph({
                          spacing: { before: 40, after: 40 },
                          children: [
                            new TextRun({ text: 'Materi/Subtopik:\n', bold: true, font: 'Arial', size: 18 }),
                            new TextRun({ text: pb.materiSubtopik, font: 'Arial', size: 18 })
                          ]
                        }),
                        new Paragraph({
                          spacing: { before: 40, after: 40 },
                          children: [
                            new TextRun({ text: 'Praktik Pedagogis:\n', bold: true, font: 'Arial', size: 18 }),
                            new TextRun({ text: pb.praktikPedagogis, color: '0284C7', bold: true, font: 'Arial', size: 18 })
                          ]
                        })
                      ]
                    }),
                    new TableCell({
                      width: { size: 75, type: WidthType.PERCENTAGE },
                      children: [
                        // A. MEMAHAMI
                        new Paragraph({
                          spacing: { before: 80, after: 40 },
                          children: [
                            new TextRun({ text: `A. MEMAHAMI [Karakter: ${pb.memahami.karakter.toUpperCase()}]`, bold: true, font: 'Arial', size: 20, color: '0F172A' })
                          ]
                        }),
                        ...pb.memahami.aktivitas.map(
                          (act) =>
                            new Paragraph({
                              spacing: { before: 30, after: 30 },
                              children: [
                                new TextRun({ text: `• `, bold: true, font: 'Arial', size: 20 }),
                                new TextRun({ text: act, font: 'Arial', size: 20 })
                              ]
                            })
                        ),
                        // B. MENGAPLIKASI
                        new Paragraph({
                          spacing: { before: 120, after: 40 },
                          children: [
                            new TextRun({ text: `B. MENGAPLIKASI [Sintaks ${pb.praktikPedagogis}]`, bold: true, font: 'Arial', size: 20, color: '0F172A' })
                          ]
                        }),
                        ...pb.mengaplikasi.tahapan.map(
                          (th) =>
                            new Paragraph({
                              spacing: { before: 40, after: 40 },
                              children: [
                                new TextRun({ text: `${th.sintaks}: `, bold: true, font: 'Arial', size: 20, color: '0369A1' }),
                                new TextRun({ text: th.kegiatan, font: 'Arial', size: 20 })
                              ]
                            })
                        ),
                        // C. REFLEKSI
                        new Paragraph({
                          spacing: { before: 120, after: 40 },
                          children: [
                            new TextRun({ text: `C. REFLEKSI [Karakter: ${pb.refleksi.karakter.toUpperCase()}]`, bold: true, font: 'Arial', size: 20, color: '0F172A' })
                          ]
                        }),
                        ...pb.refleksi.aktivitas.map(
                          (act) =>
                            new Paragraph({
                              spacing: { before: 30, after: 30 },
                              children: [
                                new TextRun({ text: `• `, bold: true, font: 'Arial', size: 20 }),
                                new TextRun({ text: act, font: 'Arial', size: 20 })
                              ]
                            })
                        )
                      ]
                    })
                  ]
                });
              })
            ]
          }),

          // ==================== TABEL 5 ====================
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 360, after: 120 },
            children: [
              new TextRun({
                text: 'TABEL 5 — ASESMEN PEMBELAJARAN',
                bold: true,
                font: 'Arial',
                size: 22,
                color: '1E3A8A'
              })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            columnWidths: col3Asesmen,
            borders: TABLE_BORDERS,
            rows: [
              new TableRow({
                children: [
                  createHeaderCell('Bentuk Asesmen', 25),
                  createHeaderCell('Teknik & Instrumen Penilaian', 40),
                  createHeaderCell('Penjelasan & Relevansi Pembelajaran', 35)
                ]
              }),
              new TableRow({
                children: [
                  createTextCell('A. Asesmen Awal (Diagnostik)', 25, true),
                  new TableCell({
                    width: { size: 40, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: `Teknik: ${asesmenPembelajaran.asesmenAwal.teknik.join(', ')}`, font: 'Arial', size: 20 })] }),
                      new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: `Instrumen: ${asesmenPembelajaran.asesmenAwal.instrumen}`, bold: true, font: 'Arial', size: 20 })] })
                    ]
                  }),
                  createTextCell(asesmenPembelajaran.asesmenAwal.penjelasan, 35)
                ]
              }),
              new TableRow({
                children: [
                  createTextCell('B. Asesmen Proses (Formatif)', 25, true),
                  new TableCell({
                    width: { size: 40, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: `Teknik: ${asesmenPembelajaran.asesmenProses.teknik.join(', ')}`, font: 'Arial', size: 20 })] }),
                      new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: `Instrumen: ${asesmenPembelajaran.asesmenProses.instrumen}`, bold: true, font: 'Arial', size: 20 })] })
                    ]
                  }),
                  createTextCell(asesmenPembelajaran.asesmenProses.penjelasan, 35)
                ]
              }),
              new TableRow({
                children: [
                  createTextCell('C. Asesmen Akhir (Sumatif)', 25, true),
                  new TableCell({
                    width: { size: 40, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: `Bentuk: ${asesmenPembelajaran.asesmenAkhir.bentuk}`, bold: true, font: 'Arial', size: 20 })] }),
                      new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: `Kriteria: ${asesmenPembelajaran.asesmenAkhir.kriteria}`, font: 'Arial', size: 20 })] })
                    ]
                  }),
                  createTextCell(asesmenPembelajaran.asesmenAkhir.penjelasan, 35)
                ]
              })
            ]
          }),

          // ==================== RUBRIK ASESMEN ====================
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 360, after: 120 },
            children: [
              new TextRun({
                text: 'RUBRIK ASESMEN PEMBELAJARAN (4 LEVEL)',
                bold: true,
                font: 'Arial',
                size: 22,
                color: '1E3A8A'
              })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            columnWidths: col5Rubrik,
            borders: TABLE_BORDERS,
            rows: [
              new TableRow({
                children: [
                  createHeaderCell('Indikator & Kriteria', 24),
                  createHeaderCell('Skor 1 (Perlu Bimbingan)', 19),
                  createHeaderCell('Skor 2 (Cukup)', 19),
                  createHeaderCell('Skor 3 (Baik)', 19),
                  createHeaderCell('Skor 4 (Sangat Baik)', 19)
                ]
              }),
              ...asesmenPembelajaran.rubrikAsesmen.map(
                (rb) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        width: { size: 24, type: WidthType.PERCENTAGE },
                        children: [
                          new Paragraph({ spacing: { before: 40, after: 20 }, children: [new TextRun({ text: rb.indikator, bold: true, font: 'Arial', size: 20 })] }),
                          new Paragraph({ spacing: { before: 20, after: 40 }, children: [new TextRun({ text: rb.kriteria, font: 'Arial', size: 18, color: '64748B' })] })
                        ]
                      }),
                      createTextCell(rb.skor1, 19),
                      createTextCell(rb.skor2, 19),
                      createTextCell(rb.skor3, 19),
                      createTextCell(rb.skor4, 19)
                    ]
                  })
              )
            ]
          }),

          // ==================== BLOK TANDA TANGAN ====================
          new Paragraph({
            spacing: { before: 360, after: 40 },
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: `${tandaTangan.tempatTanggal}`,
                font: 'Arial',
                size: 20
              })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            columnWidths: col2Sign,
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE }
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: 'Mengetahui,', font: 'Arial', size: 20 })] }),
                      new Paragraph({ children: [new TextRun({ text: tandaTangan.kepalaSekolah.jabatan, bold: true, font: 'Arial', size: 20 })] }),
                      new Paragraph({ children: [new TextRun({ text: tandaTangan.kepalaSekolah.namaSekolah, bold: true, font: 'Arial', size: 20 })] }),
                      new Paragraph({ spacing: { before: 720, after: 0 }, children: [new TextRun({ text: tandaTangan.kepalaSekolah.nama, bold: true, underline: {}, font: 'Arial', size: 20 })] }),
                      new Paragraph({ children: [new TextRun({ text: `NIP. ${tandaTangan.kepalaSekolah.nip}`, font: 'Arial', size: 20 })] })
                    ]
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: 'Guru Pengampu,', font: 'Arial', size: 20 })] }),
                      new Paragraph({ children: [new TextRun({ text: `${tandaTangan.guruMapel.jabatan}`, bold: true, font: 'Arial', size: 20 })] }),
                      new Paragraph({ children: [new TextRun({ text: `${tandaTangan.guruMapel.mapel}`, bold: true, font: 'Arial', size: 20 })] }),
                      new Paragraph({ spacing: { before: 720, after: 0 }, children: [new TextRun({ text: tandaTangan.guruMapel.nama, bold: true, underline: {}, font: 'Arial', size: 20 })] }),
                      new Paragraph({ children: [new TextRun({ text: `NIP. ${tandaTangan.guruMapel.nip}`, font: 'Arial', size: 20 })] })
                    ]
                  })
                ]
              })
            ]
          }),

          // Footer info
          new Paragraph({
            spacing: { before: 400, after: 0 },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: '© 2026 Generator PPM Pro Premium — By Ahmad Yurid Ardiansah, S.Pd.',
                font: 'Arial',
                size: 16,
                color: '94A3B8'
              })
            ]
          })
        ]
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `PPM_${identitas.mataPelajaran.replace(/\s+/g, '_')}_${identitas.kelas.replace(/\s+/g, '_')}.docx`;
  saveAs(blob, fileName);
}
