import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        namaKontingen: '',
        emailKontingen: '',
        password: '',
        retypePassword: '',
        penanggungJawab: '',
        noTelepon: '',
        asalKontingen: 'DALAM_NEGERI',
        negara: 'indonesia',
        alamat: '',
    });

    const [retypePasswordError, setRetypePasswordError] = useState('');

    useEffect(() => {
        return () => {
            reset('password', 'retypePassword');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        // Cek apakah password dan retypePassword sama
        if (data.password !== data.retypePassword) {
            setRetypePasswordError('Konfirmasi password tidak sesuai.');
            return;
        } else {
            setRetypePasswordError('');
        }

        // Kirim ke backend tanpa `retypePassword`
        post(route('register'), {
            data: {
                ...data,
                retypePassword: undefined, // Hapus agar tidak terkirim ke backend 
            }
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <form onSubmit={submit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="namaKontingen" value="Nama Kontingen" />
                        <TextInput id="namaKontingen" name="namaKontingen" value={data.namaKontingen} className="w-full" onChange={(e) => setData('namaKontingen', e.target.value)} required />
                        <InputError message={errors.namaKontingen} />
                    </div>
                    <div>
                        <InputLabel htmlFor="emailKontingen" value="Email Kontingen" />
                        <TextInput id="emailKontingen" type="email" name="emailKontingen" value={data.emailKontingen} className="w-full" onChange={(e) => setData('emailKontingen', e.target.value)} required />
                        <InputError message={errors.emailKontingen} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput id="password" type="password" name="password" value={data.password} className="w-full" onChange={(e) => setData('password', e.target.value)} required />
                        <InputError message={errors.password} />
                    </div>
                    <div>
                        <InputLabel htmlFor="retypePassword" value="Retype Password" />
                        <TextInput
                            id="retypePassword"
                            type="password"
                            name="retypePassword"
                            value={data.retypePassword}
                            className="w-full"
                            onChange={(e) => setData('retypePassword', e.target.value)}
                            required
                        />
                        <InputError message={retypePasswordError} /> {/* Tampilkan error lokal */}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="penanggungJawab" value="Nama Penanggung Jawab" />
                        <TextInput id="penanggungJawab" name="penanggungJawab" value={data.penanggungJawab} className="w-full" onChange={(e) => setData('penanggungJawab', e.target.value)} required />
                        <InputError message={errors.penanggungJawab} />
                    </div>
                    <div>
                        <InputLabel htmlFor="noTelepon" value="Nomor Telepon Penanggung Jawab" />
                        <TextInput id="noTelepon" name="noTelepon" value={data.noTelepon} className="w-full" onChange={(e) => setData('noTelepon', e.target.value)} required />
                        <InputError message={errors.noTelepon} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="asalKontingen" value="Asal Kontingen" />
                        <select id="asalKontingen" name="asalKontingen" value={data.asalKontingen} className="w-full" onChange={(e) => setData('asalKontingen', e.target.value)}>
                            <option value="DALAM_NEGERI">Dalam Negeri</option>
                            <option value="LUAR_NEGERI">Luar Negeri</option>
                        </select>
                        <InputError message={errors.asalKontingen} />
                    </div>
                    <div>
                        <InputLabel htmlFor="negara" value="Negara" />
                        <select id="negara" name="negara" value={data.negara} className="w-full" onChange={(e) => setData('negara', e.target.value)}>
                            <option value="INDONESIA">Indonesia</option>
                            <option value="SINGAPORE">Singapura</option>
                        </select>
                        <InputError message={errors.negara} />
                    </div>
                </div>
                <div>
                    <InputLabel htmlFor="alamat" value="Alamat Lengkap" />
                    <TextInput id="alamat" name="alamat" value={data.alamat} className="w-full" onChange={(e) => setData('alamat', e.target.value)} required />
                    <InputError message={errors.alamat} />
                </div>
                <div className="flex items-center justify-between">
                    <Link href={route('login')} className="text-sm text-gray-600 hover:text-gray-900">
                        Sudah punya akun?
                    </Link>
                    <PrimaryButton disabled={processing}>
                        Daftar
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
