const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Đang xóa dữ liệu cũ...');

  // Xóa theo thứ tự để tránh lỗi ràng buộc khóa ngoại (Foreign Key Constraints)
  await prisma.readingProgress.deleteMany();
  await prisma.productReview.deleteMany();
  await prisma.userLibrary.deleteMany();
  await prisma.creatorEarning.deleteMany();
  await prisma.storeOrderItem.deleteMany();
  await prisma.storeOrder.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.productSubmission.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.productGenre.deleteMany();
  await prisma.productRevenueStat.deleteMany();
  await prisma.product.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.walletTransaction.deleteMany();
  await prisma.walletTopupOrder.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.creatorSettlement.deleteMany();
  await prisma.creatorProfile.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.role.deleteMany();
  await prisma.user.deleteMany();

  console.log('🎭 Đang tạo vai trò...');
  const roles = await Promise.all([
    prisma.role.create({ data: { name: 'USER', description: 'Người dùng đọc sách' } }),
    prisma.role.create({ data: { name: 'CREATOR', description: 'Tác giả sáng tạo nội dung' } }),
    prisma.role.create({ data: { name: 'ADMIN', description: 'Quản trị viên hệ thống' } }),
  ]);

  console.log('👤 Đang tạo người dùng mẫu...');
  const reader = await prisma.user.create({
    data: {
      username: 'reader01',
      email: 'reader01@gmail.com',
      password: 'hashed_password',
      displayName: 'Độc Giả Số 1',
    },
  });

  const creator = await prisma.user.create({
    data: {
      username: 'creator01',
      email: 'creator01@gmail.com',
      password: 'hashed_password',
      displayName: 'Tác Giả Huyền Thoại',
    },
  });

  const admin = await prisma.user.create({
    data: {
      username: 'admin01',
      email: 'admin01@gmail.com',
      password: 'hashed_password',
      displayName: 'Quản Trị Viên',
    },
  });

  // Gán vai trò
  await prisma.userRole.createMany({
    data: [
      { userId: reader.id, roleId: roles[0].id },
      { userId: creator.id, roleId: roles[1].id },
      { userId: admin.id, roleId: roles[2].id },
    ],
  });

  // Tạo Creator Profile
  const creatorProfile = await prisma.creatorProfile.create({
    data: {
      userId: creator.id,
      penName: 'Lão Hạc 4.0',
      bio: 'Chuyên viết về cuộc sống hiện đại và những điều kỳ bí.',
      status: 'APPROVED',
    },
  });

  console.log('💰 Đang thiết lập ví cho người dùng...');
  const wallet = await prisma.wallet.create({
    data: {
      userId: reader.id,
      balance: 500000,
    },
  });

  await prisma.walletTransaction.create({
    data: {
      walletId: wallet.id,
      type: 'TOPUP',
      amount: 500000,
      description: 'Nạp tiền ban đầu để trải nghiệm hệ thống',
    },
  });

  // Tạo giỏ hàng trống
  await prisma.cart.create({ data: { userId: reader.id } });

  console.log('📚 Đang tạo thể loại...');
  const genres = await Promise.all([
    prisma.genre.create({ data: { name: 'Hành động', slug: 'hanh-dong' } }),
    prisma.genre.create({ data: { name: 'Kỳ ảo', slug: 'ky-ao' } }),
    prisma.genre.create({ data: { name: 'Lãng mạn', slug: 'lang-man' } }),
    prisma.genre.create({ data: { name: 'Truyện tranh', slug: 'truyen-tranh' } }),
  ]);

  console.log('📦 Đang tạo sản phẩm mẫu...');
  const productsData = [
    {
      title: 'Hành Trình Về Phương Đông',
      slug: 'hanh-trinh-ve-phuong-dong',
      authorName: 'Baird T. Spalding',
      description: 'Cuốn sách kể về những trải nghiệm của một đoàn khoa học Anh tại Ấn Độ, khám phá những chân lý tâm linh huyền bí của phương Đông.',
      price: 159000,
      coverImageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop',
      productType: 'EBOOK',
      status: 'PUBLISHED',
      genres: [genres[1].id],
    },
    {
      title: 'One Punch Man',
      slug: 'one-punch-man',
      authorName: 'ONE & Yusuke Murata',
      description: 'Câu chuyện về Saitama, một anh hùng siêu mạnh có thể đánh bại bất kỳ kẻ thù nào chỉ bằng một cú đấm. Với sức mạnh vô song, anh luôn cảm thấy nhàm chán và đi tìm một đối thủ xứng tầm.',
      price: 35000,
      coverImageUrl: 'https://res.cloudinary.com/dtxcpiwvw/image/upload/v1781671240/onepunch-man_1552232163_vmaumk.jpg',
      productType: 'COMIC',
      status: 'PUBLISHED',
      genres: [genres[3].id, genres[0].id],
      isSpecial: true, // Cờ để chúng ta xử lý riêng các chương ảnh
    },
    {
      title: 'Đại Chiến Thiên Hà',
      slug: 'dai-chien-thien-ha',
      authorName: 'Nguyễn Văn A',
      description: 'Một tiểu thuyết khoa học viễn tưởng hoành tráng về cuộc chiến giữa các nền văn minh trong vũ trụ bao la.',
      price: 89000,
      coverImageUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop',
      productType: 'NOVEL',
      status: 'PUBLISHED',
      genres: [genres[0].id, genres[1].id],
    },
  ];

  for (const p of productsData) {
    const product = await prisma.product.create({
      data: {
        title: p.title,
        slug: p.slug,
        authorName: p.authorName,
        description: p.description,
        price: p.price,
        coverImageUrl: p.coverImageUrl,
        productType: p.productType,
        status: p.status,
        creatorId: creatorProfile.id,
      },
    });

    // Gán thể loại
    for (const genreId of p.genres) {
      await prisma.productGenre.create({
        data: { productId: product.id, genreId: genreId },
      });
    }

    // Xử lý chương
    if (p.slug === 'one-punch-man') {
      // ====== LOGIC ĐÚNG CHO TRUYỆN TRANH ======
      // 1 Chapter = 1 Tập. Lưu TẤT CẢ trang vào imagesJson.
      // Trình đọc sẽ hiển thị tất cả ảnh liên tiếp, cuộn từ trên xuống dưới.
      const tap1Pages = [
        'https://res.cloudinary.com/dtxcpiwvw/image/upload/v1781671091/0_rlhhtj.jpg',
        'https://res.cloudinary.com/dtxcpiwvw/image/upload/v1781671091/1_qma9nk.jpg',
        'https://res.cloudinary.com/dtxcpiwvw/image/upload/v1781671091/3_a4z205.jpg',
        'https://res.cloudinary.com/dtxcpiwvw/image/upload/v1781671091/4_k7nnwy.jpg',
        'https://res.cloudinary.com/dtxcpiwvw/image/upload/v1781671092/5_dhj8gr.jpg',
        'https://res.cloudinary.com/dtxcpiwvw/image/upload/v1781671092/6_wligk4.jpg',
        'https://res.cloudinary.com/dtxcpiwvw/image/upload/v1781671092/7_o6uwj4.jpg',
        'https://res.cloudinary.com/dtxcpiwvw/image/upload/v1781671092/8_btwwvf.jpg',
        'https://res.cloudinary.com/dtxcpiwvw/image/upload/v1781671092/9_yrn2cl.jpg',
        'https://res.cloudinary.com/dtxcpiwvw/image/upload/v1781671093/10_ek7uho.jpg',
        'https://res.cloudinary.com/dtxcpiwvw/image/upload/v1781671093/11_vgve3o.jpg',
        'https://res.cloudinary.com/dtxcpiwvw/image/upload/v1781671093/12_fhdmva.jpg',
        'https://res.cloudinary.com/dtxcpiwvw/image/upload/v1781671093/13_ju1xra.jpg',
        'https://res.cloudinary.com/dtxcpiwvw/image/upload/v1781671094/14_stnuys.jpg',
        'https://res.cloudinary.com/dtxcpiwvw/image/upload/v1781671094/15_gc1waw.jpg',
        'https://res.cloudinary.com/dtxcpiwvw/image/upload/v1781671093/16_kwrsvh.jpg',
        'https://res.cloudinary.com/dtxcpiwvw/image/upload/v1781671093/17_laujqw.jpg',
        'https://res.cloudinary.com/dtxcpiwvw/image/upload/v1781671094/18_scgqrg.jpg',
        'https://res.cloudinary.com/dtxcpiwvw/image/upload/v1781671094/19_avysf0.jpg',
        'https://res.cloudinary.com/dtxcpiwvw/image/upload/v1781671094/20_ivmfqr.jpg',

      ];

      await prisma.chapter.create({
        data: {
          productId: product.id,
          title: 'Tập 1 - Người Yêu N/A',
          chapterNumber: 1,
          imagesJson: JSON.stringify(tap1Pages), // Toàn bộ trang trong 1 chapter
          isFree: true,
        },
      });
    } else {
      for (let i = 1; i <= 3; i++) {
        await prisma.chapter.create({
          data: {
            productId: product.id,
            title: `Chương ${i}: ${p.title} - Khởi đầu`,
            chapterNumber: i,
            content: `Đây là nội dung chữ của chương ${i} dành cho tác phẩm "${p.title}". Hệ thống tự động nhận diện đây là truyện chữ dựa trên việc có content thay vì imageUrl.`,
            isFree: i === 1,
          },
        });
      }
    }
  }

  console.log('✨ Đã hoàn thành quá trình nạp dữ liệu mẫu!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
