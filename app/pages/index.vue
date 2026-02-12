<template>
  <div>
    <div class="card">
      <h2>Buku Tamu</h2>
      <p class="subtitle">Teaching Factory TOI - SMKN 4 Tasikmalaya</p>

      <div class="d-flex justify-content-between align-items-center mb-3">
        <button class="btn btn-dark btn-lg" data-bs-toggle="modal" data-bs-target="#form-modal">+ Isi Buku</button>
        <span class="text-muted text-center">Menampilkan {{ records.length }} Pengunjung</span>
        <div class="d-flex align-items-center gap-2">
          <form @submit.prevent="fetchData">
            <input v-model="keyword" class="form-control form-control-lg" type="search" id="search" placeholder="Cari Nama..."/>
          </form>
        </div>
      </div>
      <table id="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Tanggal</th>
            <th>Nama Lengkap</th>
            <th>Nomor Telepon</th>
            <th>Alamat / Instansi</th>
            <th>Tujuan Kunjungan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, i) in records" :key="record.id">
            <td>{{ i+1 }}.</td>
            <td>{{ record.tanggal }}</td>
            <td>{{ record.nama }}</td>
            <td>{{ record.nomor }}</td>
            <td>{{ record.alamat }}</td>
            <td>{{ record.tujuan_kunjungan }}</td>
          </tr>
        </tbody>
      </table>

      <div class="next">
    <button @click="prevPage" class="btn btn-dark btn-lg">Sebelumnya</button>
    <span class="mx-3">Halaman {{ page }}</span>
     <button @click="nextPage" class="btn btn-dark btn-lg">Selanjutnya</button>
    </div>
    </div>



    <!-- MODAL FORM -->
     <div class="modal fade" id="form-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-dark text-white">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Isi Buku </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="mb-4">
                <label for="nama">Nama Lengkap</label>
                <input v-model="form.nama" type="text" class="form-control form-control-lg" placeholder="Nama Lengkap" required>
              </div>
              <div class="mb-4">
                <label for="nomor">Nomor Telepon</label>
                <input v-model="form.nomor" type="text" class="form-control form-control-lg" placeholder="Nomor Telepon" required>
              </div>
              <div class="mb-4">
                <label for="alamat">Alamat / Instansi</label>
                <textarea v-model="form.alamat" rows="3" class="form-control form-control-lg" placeholder="Tulis alamat lengkap/instansi" required></textarea>
              </div>
              <div class="mb-4">
                <label for="tujuan_kunjungan">Tujuan Kunjungan</label>
                <textarea v-model="form.tujuan_kunjungan" rows="3" class="form-control form-control-lg" placeholder="Tujuan Kunjungan" required></textarea>
              </div>
              <button :disabled="form.nama.length < 4 || form.nomor.length < 10 || form.alamat.length < 20 || form.tujuan_kunjungan < 20" type="submit" class="btn btn-dark btn-lg">Kirim</button>
              <button class="btn btn-outline-dark btn-lg ms-2 float-end" data-bs-dismiss="modal">Tutup</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Buku Tamu - Teaching Factory TOI SMKN 4 Tasikmalaya',
  meta: [
    { name: 'description', content: 'Buku tamu digital untuk mencatat pengunjung ke Teaching Factory TOI SMKN 4 Tasikmalaya' }
  ]
})
const client = useSupabaseClient()

const form = ref({
  nama: '',
  nomor: '',
  alamat: '',
  tujuan_kunjungan: ''
})

const records = ref([])
const page = ref(1)
const pageSize = 30
const keyword = ref('')

async function submitForm() {
  console.log('Submitting form:', form.value)
  const { data, error } = await client
    .from('bukutamutoi')
    .insert([form.value])
  
  if (error) {
    console.error('Error inserting data:', error)
  } else {
    console.log('Data inserted successfully:', data)
    // Reset form
    form.value.nama = ''
    form.value.nomor = ''
    form.value.alamat = ''
    form.value.tujuan_kunjungan = ''
    fetchData()
  }
}

async function fetchData() {
  const from = (page.value - 1) * pageSize
  const to = from + pageSize - 1

  if(keyword.value.length > 0) {
    const { data, error } = await client
      .from('bukutamutoi')
      .select('*')
      .ilike('nama', `%${keyword.value}%`)
      .order('tanggal', { ascending: false })
      .range(from, to)
    
    if (error) {
      console.error('Error fetching data:', error)
    } else {
      records.value = data
    }
    return
  }
  else {
    const { data, error } = await client
      .from('bukutamutoi')
      .select('*')
        .order('tanggal', { ascending: false })
        .range(from, to)
    
    if (error) {
      console.error('Error fetching data:', error)
    } else {
      records.value = data
    }
  }
}

function nextPage() {
  page.value++
  fetchData()
}
function prevPage() {
  if (page.value > 1) {
    page.value--
    fetchData()
  }
}
onMounted(() => {
  fetchData()
})
</script>
