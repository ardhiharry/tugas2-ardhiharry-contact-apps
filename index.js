// panggil fungsi readline 
const readline = require('./readline');
//  panggil fungsi untuk menyimpan database sementara
const databaseKontak = require('./storage');


// buat object kosong untuk menampung inputan 
let objectKontak = {
    nama : '',
    nomorHp : ''
}


function viewMenu() { //fungsi untuk menampilkan halaman menu
    console.log("Selamat Datang Di Aplikasi Kontak !");
    console.log("====================================\n");
    console.log("Main Menu :\n");
    console.log("1.Tambah Data \n");
    console.log("2.Lihat Data \n");
    console.log("3.Reset Data \n");
    console.log("4.Pencarian Data \n");
    console.log("5.Hapus Data \n");
    console.log("0.Exit \n");
    readline.question(`Silahkan Masukan Pilihan Anda: `, input => {
        mainMenu(Number(input));
    });
}



function mainMenu(pilihan) { // fungsi untuk mengatur pilihan menu
    switch (pilihan) {
        case 1:
            simpan();
            break;
        case 2:
            lihatData();
            break;
        // lanjutkan menu pilihanya disini secara urut
        case 3:
            resetData();
            break;
        case 4:
            pencarianData();
            break;
        case 5:
            hapusData();
            break;
        case 0:
            readline.close();
            break;
        default:
            console.log("Pilihan Tidak Valid!");
            viewMenu();
            break;
    }
}



function simpan() { // fungsi untuk menyimpan data
    console.log("\nSilahkan Masukan Data!");
    readline.question("Nama: ", (nama) => {
        objectKontak.nama = nama
        ambilInputanNomor();
    });
    
}
const ambilInputanNomor = () => { // fungsi untuk mengambil inputan nomor
    readline.question("Nomor: ", (nomor) => {
        objectKontak.nomorHp = nomor
        databaseKontak.push(Object.assign({},objectKontak)) // insert data kedalam array databseKOntak
        console.log("Input data berhasil")
        kembali();
    });
}
const kembali = () => { // fungsi untuk navigasi kembali
    readline.question("\nApakah Anda Ingin Kembali? (y/n): ", (pilihan) => {
        if(pilihan === "y"){
            viewMenu();
        }else {
            readline.close();
        }
        
    });
}

function lihatData () { // fungsi untuk melihat list data
    console.table(databaseKontak);
    kembali();
}

function resetData () {
    // tambahkan fungsi reset  data disini
    while(databaseKontak.length) {
        databaseKontak.pop();
    }
    console.log("Data berhasil direset!");
    kembali();
}

function pencarianData () {
    // tambahkan fungsi pencarian data disini
    console.log("Masukkan kata kunci pencarian!");
    readline.question("Kata Kunci: ", (keyword) => {
        databaseKontak.filter((contact) => {
            const dataFound = [
                {
                    nama: contact.nama,
                    nomorHp: contact.nomorHp
                }
            ]
            
            if( keyword === contact.nama || keyword === contact.nomorHp ) {
                console.log("Data ditemukan!");
                console.table(dataFound);
            }
        });
        kembali();
    });
}
function hapusData () {
    // tambahkan fungsi hapus data data disini
    console.log("Masukkan kata kunci data yang ingin dihapus!");
    readline.question("Kata Kunci: ", (keyword) => {
        const index = databaseKontak.findIndex((contact) => contact.nama === keyword);

        databaseKontak.filter((contact) => {
            if( keyword === contact.nama || keyword === contact.nomorHp ) databaseKontak.splice(index, 1);
        });
        console.log("Data berhasil dihapus!")
        console.table(databaseKontak);
        kembali();
    });
}


viewMenu(); // panggil fungsi view menu untuk pertama kali